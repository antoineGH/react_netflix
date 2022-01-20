import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import {
  Movies,
  Movie,
  MovieSlice,
  argsDelete,
  args,
  argsPost,
} from 'types/movie'
import { getMovies, getMovie, createMovie, deleteMovie } from 'api/movie'
import { RootState } from 'store'

const initialState: MovieSlice = {
  movie: {},
  isLoadingMovie: false,
  hasErrorMovie: false,
  movies: [],
  isLoadingMovies: false,
  hasErrorMovies: false,
  isLoadingAddMovie: false,
  hasErrorAddMovie: false,
  isLoadingUpdateMovie: false,
  hasErrorUpdateMovie: false,
  isLoadingDeleteMovie: false,
  hasErrorDeleteMovie: false,
}

export const loadMovies = createAsyncThunk(
  'movie/getMovies',
  async (listID: number) => getMovies(listID),
)

export const loadMovie = createAsyncThunk(
  'movie/getMovies',
  async (movieID: number) => getMovie(movieID),
)

export const addMovie = createAsyncThunk(
  'movie/addMovie',
  async (args: argsPost) => createMovie(args),
)

export const removeMovie = createAsyncThunk(
  'movie/removeMovie',
  async (movieID: number) => deleteMovie(movieID),
)

export const movie = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
})

export default movie.reducer

export const getMovieState = (state: RootState) => state.movie

export const getMoviesSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.movies,
)

export const getMoviesLoadingSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.isLoadingMovies,
)

export const getMoviesErrorSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.hasErrorMovies,
)

export const getMovieSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.movie,
)

export const getMovieLoadinfSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.isLoadingMovie,
)

export const getMovieErrorSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.hasErrorMovie,
)

export const addMovieLoadingSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.isLoadingAddMovie,
)

export const adMovieErrorSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.hasErrorAddMovie,
)

export const deleteMovieLoadingSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.isLoadingDeleteMovie,
)

export const deleteMovieErrorSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.hasErrorDeleteMovie,
)
