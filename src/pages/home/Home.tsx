import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMovies } from "../../infrastructure/Movies/MovieClient";
import { IMovie } from "../../domain/Movies/Movies";
import ReactPaginate from "react-paginate";
import "./Home.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Cards from "../../components/Card/Card";
import { LoadingContext } from "../../Layout/Root";

const Home = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { type } = useParams();
  const { setLoading } = useContext(LoadingContext);

  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [pageCurrent, setPageCurrent] = useState<number>(0);

  const page = useMemo(() => search.split("=")[1], [search]);

  const handleGetMovies = useCallback(
    async (currentPage: number) => {
      try {
        setLoading(true);
        const movie = await getMovies(currentPage, type || "now_playing");
        setMovieList(movie.results);
      } catch (error) {
        navigate("/errorPage");
      } finally {
        setLoading(false);
      }
    },
    [navigate, setLoading, type]
  );
  useEffect(() => {
    if (!page) {
      setPageCurrent(0);
      handleGetMovies(1);
    } else {
      setPageCurrent(+page - 1);
      handleGetMovies(+page);
    }
  }, [page, type]);

  const handlePageClick = (data: { selected: number }) => {
    navigate(`?page=${data.selected + 1}`);
    if (data.selected === 0) {
      setPageCurrent(data.selected + 1);
    } else {
      setPageCurrent(data.selected);
    }
    handleGetMovies(data.selected + 1);
  };
  return (
    <>
      <div className="poster">
        <>
          <div className="movie__list">
            <h2 className="list__title">
              {(!type ? "NOW PLAYING" : type).toUpperCase()}
            </h2>
            <div className="list__cards">
              {movieList.map((movie: IMovie, index: number) => (
                <Cards key={index} movie={movie} />
              ))}
            </div>
          </div>
          <div className="center-max-size-paginate pagination">
            <ReactPaginate
              breakClassName="page-item"
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={20}
              previousLabel="< previous"
              forcePage={pageCurrent}
            />
          </div>
        </>
      </div>
    </>
  );
};

export default Home;
