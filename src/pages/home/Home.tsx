import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  getMovies,
  getSearchMovie,
} from "../../infrastructure/Movies/MovieClient";
import { IMovie } from "../../domain/Movies/Movies";
import ReactPaginate from "react-paginate";
import "./Home.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Cards from "../../components/Card/Card";

const Home = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { type } = useParams();

  const [totalPage, setTotalPage] = useState<number>(0);
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [pageCurrent, setPageCurrent] = useState<number>(0);

  const page = useMemo(() => searchParams.get("page"), [searchParams]);
  const query = useMemo(() => searchParams.get("query"), [searchParams]);

  const handleGetMovies = useCallback(
    async (currentPage: number) => {
      try {
        const movie = await getMovies(currentPage, type || "now_playing");
        setMovieList(movie.results);
      } catch (error) {
        navigate("/errorPage");
      } finally {
      }
    },
    [type]
  );

  const handleSearchMovies = async () => {
    if (!page) {
      setPageCurrent(0);
      try {
        const searchMovies = await getSearchMovie(
          typeof query === "string" ? query : "",
          1
        );
        setMovieList(searchMovies.results);
        setTotalPage(searchMovies.total_pages);
      } catch (error) {
        navigate("/errorPage");
      }
      return;
    }
    try {
      const searchMovies = await getSearchMovie(
        typeof query === "string" ? query : "",
        +page
      );

      setMovieList(searchMovies.results);
      setTotalPage(searchMovies.total_pages);
    } catch (error) {
      navigate("/errorPage");
    }
  };

  const handleFetchMovie = () => {
    if (pathname.includes("search")) {
      handleSearchMovies();
      return;
    }
    if (!page) {
      setPageCurrent(0);
      handleGetMovies(1);
    } else {
      setPageCurrent(+page - 1);
      handleGetMovies(+page);
    }
  };

  const handlePageClick = (data: { selected: number }) => {
    if (data.selected === 0) {
      setPageCurrent(data.selected + 1);
    } else {
      setPageCurrent(data.selected);
    }
    navigate(`?page=${data.selected + 1}`);
    handleGetMovies(data.selected + 1);
  };

  useEffect(() => {
    handleFetchMovie();
  }, []);

  useEffect(() => {
    handleFetchMovie();
  }, [type, query]);

  useEffect(() => {
    if (!page || +page === 1) {
      setPageCurrent(0);
    } else {
      setPageCurrent(+page - 1);
    }
  }, [page]);
  return (
    <>
      <div className="poster">
        <>
          <div className="movie__list">
            <h2 className="list__title">
              {(query ? query : !type ? "NOW PLAYING" : type).toUpperCase()}
            </h2>
            <div className="list__cards">
              {movieList.length
                ? movieList.map((movie: IMovie, index: number) => (
                    <Cards key={index} movie={movie} />
                  ))
                : `No movie name ${query}`}
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
