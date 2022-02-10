export type Trendings = Trending[]

export interface Trending {
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
  trendings: Trendings
  isLoadingTrendings: boolean
  hasErrorTrendings: boolean
}

export type trendingMediaType = 'all' | 'movie' | 'tv'
export type trendingTime = 'day' | 'week'

export interface args {
  trendingMediaType: trendingMediaType
  trendingTime: trendingTime
}
