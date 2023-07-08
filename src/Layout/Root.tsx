import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Root.scss";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Carousel } from "react-responsive-carousel";
import { createContext, useEffect, useState } from "react";
import { IMovie, IMoviesResponse } from "../domain/Movies/Movies";
import { getPopularMovies } from "../infrastructure/Movies/MovieClient";
import Loading from "../components/Loading/Loading";

export const LoadingContext = createContext<any>(null);

const Root = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchMovie = async () => {
    const movies: IMoviesResponse = await getPopularMovies();
    if (movies) {
      setPopularMovies(movies.results);
    }
  };

  const handleRefresh = async () => {
    const searchQuery = search.split("=")[1];
    if (!searchQuery) {
      navigate("/?page=2");
      return;
    }
    navigate(`/?page=${+searchQuery + 1}`);
  };

  useEffect(() => {
    handleFetchMovie();
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading ? (
        <div className="center-max-size-loading center-loading">
          <Loading />
        </div>
      ) : (
        <PullToRefresh onRefresh={handleRefresh}>
          <div>
            <header className="center-max-size header">
              <div className="header__title">
                <div className="headerLeft">
                  <Link to="/">
                    <img
                      className="header__icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                      alt="header icon"
                    />
                  </Link>
                  <Link to="/movies/popular" style={{ textDecoration: "none" }}>
                    <span>Popular</span>
                  </Link>
                  <Link
                    to="/movies/top_rated"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Top Rated</span>
                  </Link>
                  <Link
                    to="/movies/upcoming"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Upcoming</span>
                  </Link>
                </div>
              </div>
              <form className="form">
                <input
                  className={`search ${
                    isActive ? "search__active" : "search__disactive"
                  }`}
                  type="text"
                  id="search"
                  onClick={() => setIsActive(true)}
                  onBlur={() => setIsActive(false)}
                />
                <button className="submit-search" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </header>
            <div className="poster">
              {!pathname.includes("detail") && (
                <Carousel
                  showThumbs={false}
                  autoPlay={true}
                  transitionTime={3}
                  infiniteLoop={true}
                  showStatus={false}
                >
                  {popularMovies.map((movie, index: number) => (
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/movie/detail/${movie.id}`}
                      key={index}
                    >
                      <div className="posterImage">
                        <img
                          src={`https://image.tmdb.org/t/p/original${
                            movie && movie.backdrop_path
                          }`}
                          alt="The movie"
                        />
                      </div>
                      <div className="posterImage__overlay">
                        <div className="posterImage__title">
                          {movie ? movie.original_title : ""}
                        </div>
                        <div className="posterImage__runtime">
                          {movie ? movie.release_date : ""}
                          <span className="posterImage__rating">
                            {movie ? movie.vote_average : ""}
                            <i className="fas fa-star" />{" "}
                          </span>
                        </div>
                        <div className="posterImage__description">
                          {movie ? movie.overview : ""}
                        </div>
                      </div>
                    </Link>
                  ))}
                </Carousel>
              )}
              <Outlet />
            </div>

            <footer>
              <div className="footer">
                <div className="row">
                  Copyright [2016] Nam-Nguyen <br /> Licensed under the Apache
                  License, Version 2.0 (the "License"); <br />
                  you may not use this file except in compliance with the
                  License. <br />
                  You may obtain a copy of the License at <br /> <br />
                  http://www.apache.org/licenses/LICENSE-2.0 <br />
                  <br />
                  Unless required by applicable law or agreed to in writing,
                  software <br />
                  distributed under the License is distributed on an "AS IS"
                  BASIS, <br />
                  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
                  or implied. <br />
                  See the License for the specific language governing
                  permissions and <br />
                  limitations under the License.
                </div>
              </div>
            </footer>
          </div>
        </PullToRefresh>
      )}
    </LoadingContext.Provider>
  );
};

export default Root;
