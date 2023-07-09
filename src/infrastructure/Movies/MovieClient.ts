import AxiosClient from "../../config/axios.config";
import {
  MOVIES_URI,
  MOVIE_DETAIL,
  POPULAR_MOVIES,
  SEARCH_MOVIE,
} from "../../constants";
import { IMoviesResponse, Movie } from "../../domain/Movies/Movies";

async function getMovies(
  currentPage: number,
  type: string
): Promise<IMoviesResponse> {
  const axiosClient = new AxiosClient();
  const uri = MOVIES_URI(currentPage, type);

  return axiosClient.get(uri).then((res) => res.data);
}

async function getPopularMovies() {
  const axiosClient = new AxiosClient();
  const uri = POPULAR_MOVIES;
  return axiosClient.get(uri).then((res) => res.data);
}

async function getMovieDetail(movieId: number): Promise<Movie> {
  const axiosClient = new AxiosClient();
  const uri = MOVIE_DETAIL(movieId);
  return axiosClient.get(uri).then((res) => res.data);
}

async function getSearchMovie(
  query: string,
  page: number
): Promise<IMoviesResponse> {
  const axiosClient = new AxiosClient();
  const uri = SEARCH_MOVIE(query, page);
  return axiosClient.get(uri).then((res) => res.data);
}
export { getMovies, getPopularMovies, getMovieDetail, getSearchMovie };
