import {
  Discover,
  argsDiscover,
  MediaTypeDiscover,
  LanguageDiscover,
  YearDiscover,
  GenreDiscover,
  SortByDiscover,
} from 'types/discover'

export const getDiscover = async (args: argsDiscover): Promise<Discover> => {
  const MediaTypeDiscover: MediaTypeDiscover = args.MediaTypeDiscover
  const LanguageDiscover: LanguageDiscover = args.LanguageDiscover
  const YearDiscover: YearDiscover = args.YearDiscover
  const GenreDiscover: GenreDiscover = args.GenreDiscover
  const SortByDiscover: SortByDiscover = args.SortByDiscover
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/discover/${MediaTypeDiscover}?language=${LanguageDiscover}&year=${YearDiscover}&with_genres=${GenreDiscover}&sort_by=${SortByDiscover}`,
    )
    const json = await data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Discover')
  }
}
