export type mediaType = 'movie' | 'tv'

export interface Genre {
  id: number
  name: string
}

export let Genres: Array<Genre>

export interface GenreSlice {
  genres: typeof Genres
  isLoadingGenre: boolean
  hasErrorGenre: boolean
}
