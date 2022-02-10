import {
  Discover,
  argsDiscover,
  MediaTypeDiscover,
  LanguageDiscover,
  YearDiscover,
  GenreDiscover,
  SortByDiscover,
  Page,
} from 'types/discover'

type YearDiscoverURL = string | number
type GenreDiscoverURL = string | number

export const getDiscover = async (args: argsDiscover): Promise<Discover> => {
  const MediaTypeDiscover: MediaTypeDiscover = args.MediaTypeDiscover
  const LanguageDiscover: LanguageDiscover = args.LanguageDiscover
  const YearDiscover: YearDiscover = args.YearDiscover
  const GenreDiscover: GenreDiscover = args.GenreDiscover
  const SortByDiscover: SortByDiscover = args.SortByDiscover
  const page: Page = args.Page

  let YearDiscoverURL: YearDiscoverURL =
    YearDiscover === 0 ? '' : `&year=${YearDiscover}`
  let genreDiscoverURL: GenreDiscoverURL =
    GenreDiscover === 0 ? '' : `&with_genres=${GenreDiscover}`
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/discover/${MediaTypeDiscover}?language=${LanguageDiscover}&page=${page}${YearDiscoverURL}${genreDiscoverURL}&sort_by=${SortByDiscover}`,
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Discover')
  }
}
