export const BASE_API_URL = process.env.REACT_APP_MOVIE_API;
export const API_KEY = process.env.REACT_APP_API_KEY;
export const SERVER_TIMEOUT = process.env.REACT_APP_SERVER_TIMEOUT;
export const BACKDROP_PATH = process.env.REACT_APP_BACKDROP_PATH;

export const POPULAR_MOVIES = `${BASE_API_URL}/movie/popular?api_key=${API_KEY}&language=en-US`;

export const MOVIES_URI = (currentPage: number, type: string) =>
  `/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&language="en"&page=${currentPage}`;
export const MOVIE_DETAIL = (movieId: number) =>
  `/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;
export const SEARCH_MOVIE = (query: string, page: number) =>
  `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
