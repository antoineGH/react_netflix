import { Trending, args, trendingMediaType, trendingTime } from 'types/trending'

export const getTrending = async (args: args): Promise<Trending> => {
  const trendingMediaType: trendingMediaType = args.trendingMediaType
  const trendingTime: trendingTime = args.trendingTime
  try {
    const data = await fetch(
      `https://flask-netflix-api.herokuapp.com/api/trending/${trendingMediaType}/${trendingTime}`,
    )
    const json = data.json()
    return json
  } catch (error) {
    console.log(error)
    throw new Error('Fail to fetch Trending')
  }
}
