export type Countries = Country[]

export interface Country {
  english_name: string
  iso_3166_1: string
  native_name: string
}

export type Languages = Language[]

export interface Language {
  english_name: string
  iso_639_1: string
  name: string
}

export type Timezones = Timezone[]

export interface Timezone {
  iso_3166_1: string
  zones: string[]
}

export interface ConfigurationSlice {
  Countries: Countries
  isLoadingCountries: boolean
  hasErrorCountries: boolean
  Languages: Languages
  isLoadingLanguages: boolean
  hasErrorLanguages: boolean
  Timezones: Timezones
  isLoadingTimezones: boolean
  hasErrorTimezones: boolean
}
