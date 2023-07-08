export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: any;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export type BelongToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type Genres = {
  id: number;
  name: string;
};

export type ProductCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type VideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongToCollection;
  budget: number;
  genres: Genres;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductCompany[];
  production_countries: ProductCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_language: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: VideoResult[];
  };
};

export enum MOVIE_TYPES {
  NOW_PLAYING = "now_playing",
  POPULAR = "popular",
}
