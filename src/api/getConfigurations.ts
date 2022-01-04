import { Countries, Languages, Timezones } from 'types/configuations'

export const getCountries = async (): Promise<Countries> => {
  try {
    const data = await fetch(
      'https://flask-netflix-api.herokuapp.com/api/configuration/countries',
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Countries')
  }
}

export const getLanguages = async (): Promise<Languages> => {
  try {
    const data = await fetch(
      'https://flask-netflix-api.herokuapp.com/api/configuration/languages',
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Languages')
  }
}

export const getTimezones = async (): Promise<Timezones> => {
  try {
    const data = await fetch(
      'https://flask-netflix-api.herokuapp.com/api/configuration/timezones',
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Timezones')
  }
}
