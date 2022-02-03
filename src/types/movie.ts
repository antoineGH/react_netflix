export type Movies = Movie[]

export interface Movie {
  listID: number
  media_id: number
  media_type: mediaType
  tmdb_id: number
  title?: string
  message?: string
}

export interface MovieSlice {
  movie: Movie | {}
  isLoadingMovie: boolean
  hasErrorMovie: boolean
  movies: Movies
  isLoadingMovies: boolean
  hasErrorMovies: boolean
  isLoadingAddMovie: boolean
  hasErrorAddMovie: boolean
  isLoadingUpdateMovie: boolean
  hasErrorUpdateMovie: boolean
  isLoadingDeleteMovie: boolean
  hasErrorDeleteMovie: boolean
}

export interface argsDelete {
  json: boolean
  mediaID: number
}

export interface args {
  tmdbID: Movie
  mediaID: number
}

export type mediaType = 'movie' | 'tv'

export interface argsPost {
  tmdbID: number
  mediaType: mediaType
  listID: number
}

export type MoviesDetails = MoviesDetail[]

export interface MoviesDetail {
  '': string
  genres: Genre[]
  homepage: string
  list_id: number
  media_id: number
  media_type: string
  original_language: string
  overview: string
  popularity: number
  poster_full_path: string
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  runtime: number
  status: string
  title: string
  tmdb_id: number
  video: boolean
  vote_count: number
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}
