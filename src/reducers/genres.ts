import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Genres, GenreSlice, mediaType } from 'types/genre'
import { getGenre } from 'api/getGenre'

const initialState: GenreSlice = {
  genres: [],
  isLoadingGenre: false,
  hasErrorGenre: false,
}

export const loadGenres = createAsyncThunk(
  'genres/getGenres',
  async (mediaType: mediaType) => getGenre(mediaType),
)

export const genres = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadGenres.fulfilled, (state, action: PayloadAction<Genres>) => {
        state.genres = action.payload
        state.isLoadingGenre = false
        state.hasErrorGenre = false
      })
      .addCase(loadGenres.pending, state => {
        state.genres = initialState.genres
        state.isLoadingGenre = true
        state.hasErrorGenre = false
      })
      .addCase(loadGenres.rejected, state => {
        state.genres = initialState.genres
        state.isLoadingGenre = false
        state.hasErrorGenre = true
      })
  },
})

export default genres.reducer
