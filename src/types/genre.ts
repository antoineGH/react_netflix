export type mediaType = 'movie' | 'tv'

export interface Genre {
  id: number
  name: string
}

export type Genres = Genre[]

export interface GenreSlice {
  genres: Genres
  isLoadingGenre: boolean
  hasErrorGenre: boolean
}
