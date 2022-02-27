export type MediaTypeDiscover = 'movie' | 'tv'
export type LanguageDiscover = string
export type YearDiscover = number
export type GenreDiscover = number
export type Page = Number
export type SortByDiscover =
  | 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'

export interface DiscoverSlice {
  discover: Discover
  isLoadingDiscover: boolean
  hasErrorDiscover: boolean
  isLoadingMoreDiscover: boolean
  hasErrorMoreDiscover: boolean
}

export interface argsDiscover {
  MediaTypeDiscover: MediaTypeDiscover
  LanguageDiscover: LanguageDiscover
  YearDiscover: YearDiscover
  GenreDiscover: GenreDiscover
  SortByDiscover: SortByDiscover
  Page: Page
}

export interface Discover {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

export interface Result {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  media_type: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  name: string
  video: boolean
  vote_average: number
  vote_count: number
}
