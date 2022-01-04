import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  configureStore,
} from '@reduxjs/toolkit'
import {
  Languages,
  Countries,
  Timezones,
  ConfigurationSlice,
} from 'types/configuations'
import { getCountries, getLanguages, getTimezones } from 'api/getConfigurations'

const initialState: ConfigurationSlice = {
  Countries: [],
  isLoadingCountries: false,
  hasErrorCountries: false,
  Languages: [],
  isLoadingLanguages: false,
  hasErrorLanguages: false,
  Timezones: [],
  isLoadingTimezones: false,
  hasErrorTimezones: false,
}

export const loadCountries = createAsyncThunk(
  'configurations/getCountries',
  async () => getCountries(),
)

export const loadLanguages = createAsyncThunk(
  'configurations/getLanguages',
  async () => getLanguages(),
)

export const loadTimezones = createAsyncThunk(
  'configurations/getTimezones',
  async () => getTimezones(),
)

export const configurations = createSlice({
  name: 'configurations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadCountries.fulfilled,
        (state, action: PayloadAction<Countries>) => {
          state.Countries = action.payload
          state.isLoadingCountries = false
          state.hasErrorCountries = false
        },
      )
      .addCase(loadCountries.pending, state => {
        state.Countries = initialState.Countries
        state.isLoadingCountries = true
        state.hasErrorCountries = false
      })
      .addCase(loadCountries.rejected, state => {
        state.Countries = initialState.Countries
        state.isLoadingCountries = false
        state.hasErrorCountries = true
      })
      .addCase(
        loadLanguages.fulfilled,
        (state, action: PayloadAction<Languages>) => {
          state.Languages = action.payload
          state.isLoadingLanguages = false
          state.hasErrorLanguages = false
        },
      )
      .addCase(loadLanguages.pending, state => {
        state.Languages = initialState.Languages
        state.isLoadingLanguages = true
        state.hasErrorLanguages = false
      })
      .addCase(loadLanguages.rejected, state => {
        state.Languages = initialState.Languages
        state.isLoadingLanguages = false
        state.hasErrorLanguages = true
      })
      .addCase(
        loadTimezones.fulfilled,
        (state, action: PayloadAction<Timezones>) => {
          state.Timezones = action.payload
          state.isLoadingTimezones = false
          state.hasErrorTimezones = false
        },
      )
      .addCase(loadTimezones.pending, state => {
        state.Timezones = initialState.Timezones
        state.isLoadingTimezones = true
        state.hasErrorTimezones = false
      })
      .addCase(loadTimezones.rejected, state => {
        state.Timezones = initialState.Timezones
        state.isLoadingTimezones = false
        state.hasErrorTimezones = true
      })
  },
})

export default configurations.reducer
