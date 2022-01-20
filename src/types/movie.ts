export type Movies = Movie[]

export interface Movie {
  listID: number
  movieID: number
  tmdbID: number
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
  movieID: number
}

export interface args {
  tmdbID: Movie
  movieID: number
}

export interface argsPost {
  tmdbID: number
  listID: number
}
