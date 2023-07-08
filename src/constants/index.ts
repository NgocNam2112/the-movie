import { MovieType } from "../infrastructure/Movies/MovieRequest";

export const BASE_API_URL = process.env.REACT_APP_MOVIE_API;
export const API_KEY = process.env.REACT_APP_API_KEY;
export const SERVER_TIMEOUT = process.env.REACT_APP_SERVER_TIMEOUT;

export const MOVIES_URI = (currentPage: number, type: MovieType) =>
  `/${type}?api_key=${process.env.REACT_APP_API_KEY}&language="en"&page=${currentPage}`;
export const POPULAR_MOVIES = `${BASE_API_URL}/popular?api_key=${API_KEY}&language=en-US`;
