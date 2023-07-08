import AxiosClient from "../../config/axios.config";
import { MOVIES_URI, MOVIE_DETAIL, POPULAR_MOVIES } from "../../constants";
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

const getMovieDetail: (movieId: number) => Promise<Movie> = async (
  movieId: number
) => {
  const axiosClient = new AxiosClient();
  const uri = MOVIE_DETAIL(movieId);
  return axiosClient.get(uri).then((res) => res.data);
};

export { getMovies, getPopularMovies, getMovieDetail };
