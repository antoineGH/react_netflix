export type mediaType = 'movie' | 'tv'
export type mediaID = string

export interface args {
  mediaType: mediaType
  mediaID: mediaID
}

export interface External {
  facebook_id: any
  id: any
  imdb_id: any
  instagram_id: any
  twitter_id: any
}

export interface ExternalSlice {
  external: {}
  isLoadingExternal: boolean
  hasErrorExternal: boolean
}
