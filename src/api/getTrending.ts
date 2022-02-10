import {
  args,
  trendingMediaType,
  trendingTime,
  Trendings,
} from 'types/trending'

export const getTrending = async (args: args): Promise<Trendings> => {
  const trendingMediaType: trendingMediaType = args.trendingMediaType
  const trendingTime: trendingTime = args.trendingTime
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/trending/${trendingMediaType}/${trendingTime}`,
    )
    const json = await data.json()
    if (!json.hasOwnProperty('results')) {
      throw new Error('Fail to fetch Trending')
    }
    return json.results
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Trending')
  }
}
