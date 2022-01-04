export type creditID = string

export interface CreditDetailsSlice {
  creditDetails: {}
  isLoadingCreditDetails: boolean
  hasErrorCreditDetails: boolean
}

export interface CreditDetails {
  credit_type: string
  department: string
  id: string
  job: string
  media: Media
  media_type: string
  person: Person
}

export interface Media {
  adult: boolean
  backdrop_path: any
  character: string
  genre_ids: number[]
  id: number
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

export interface Person {
  adult: boolean
  gender: number
  id: number
  known_for: KnownFor[]
  known_for_department: string
  name: string
  popularity: number
  profile_path: string
}

export interface KnownFor {
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
