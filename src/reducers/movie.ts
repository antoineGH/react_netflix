import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { Movies, Movie, MovieSlice, argsDelete, argsPost } from 'types/movie'
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
  'movie/getMovie',
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
  reducers: {
    selectMovie: (state, { payload }: PayloadAction<number>) => {
      state.movie = state.movies.filter(movie => movie.movie_id === payload)[0]
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadMovies.fulfilled, (state, action: PayloadAction<Movies>) => {
        if (action.payload.length < 1) {
          state.movies = []
        } else {
          state.movies = action.payload
        }
        state.isLoadingMovies = false
        state.hasErrorMovies = false
      })
      .addCase(loadMovies.pending, state => {
        state.isLoadingMovies = true
        state.hasErrorMovies = false
      })
      .addCase(loadMovies.rejected, state => {
        state.isLoadingMovies = false
        state.hasErrorMovies = true
      })
      .addCase(loadMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.movie = action.payload
        state.isLoadingMovie = false
        state.hasErrorMovie = false
      })
      .addCase(loadMovie.pending, state => {
        state.movie = initialState.movie
        state.isLoadingMovie = true
        state.hasErrorMovie = false
      })
      .addCase(loadMovie.rejected, state => {
        state.movie = initialState.movie
        state.isLoadingMovie = false
        state.hasErrorMovie = true
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.movie = action.payload
        state.movies.push(action.payload)
        state.isLoadingAddMovie = false
        state.hasErrorDeleteMovie = false
      })
      .addCase(addMovie.pending, state => {
        state.movie = initialState.movie
        state.isLoadingAddMovie = true
        state.hasErrorDeleteMovie = false
      })
      .addCase(addMovie.rejected, state => {
        state.movie = initialState.movie
        state.isLoadingAddMovie = false
        state.hasErrorDeleteMovie = true
      })
      .addCase(
        removeMovie.fulfilled,
        (state, action: PayloadAction<argsDelete>) => {
          state.movie = {}
          state.movies = state.movies.filter(
            movie => movie.movie_id !== action.payload.movieID,
          )
          state.isLoadingDeleteMovie = false
          state.hasErrorDeleteMovie = false
        },
      )
      .addCase(removeMovie.pending, state => {
        state.movie = initialState.movie
        state.isLoadingDeleteMovie = true
        state.hasErrorDeleteMovie = false
      })
      .addCase(removeMovie.rejected, state => {
        state.movie = initialState.movie
        state.isLoadingDeleteMovie = false
        state.hasErrorDeleteMovie = true
      })
  },
})

export default movie.reducer
export const { selectMovie } = movie.actions

export const getMovieState = (state: RootState) => state.movie

export const getMoviesSelector = createSelector(
  getMovieState,
  (slice: MovieSlice) => slice?.movies,
)

export const getMovieIDSelector = createSelector(
  getMovieState,
  (slice: any) => slice?.movie.movie_id,
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

export const getMovieLoadingSelector = createSelector(
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

export const addMovieErrorSelector = createSelector(
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
