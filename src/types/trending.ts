export type trendingMediaType = 'all' | 'movie' | 'tv'
export type trendingTime = 'day' | 'week'

export interface args {
  trendingMediaType: trendingMediaType
  trendingTime: trendingTime
}

export interface Trending {
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
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TrendingSlice {
  trending: Trending | {}
  isLoadingTrending: boolean
  hasErrorTrending: boolean
}