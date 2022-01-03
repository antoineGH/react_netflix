export type mediaType = 'movie' | 'tv'

export type mediaID = string

export interface args {
  mediaType: mediaType
  mediaID: mediaID
}

export type Credits = Credit[]

export interface Credit {
  adult: boolean
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path?: string
}

export interface CreditSlice {
  credits: Credits
  isLoadingCredit: boolean
  hasErrorCredit: boolean
}
