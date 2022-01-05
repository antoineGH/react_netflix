import Title from '../../components/title/Title'
import { Button } from 'antd'
import { useAppDispatch } from 'hooks/hooks'
import { loadGenres } from 'reducers/genres'
import { loadCredits } from 'reducers/credits'
import { loadCreditDetails } from 'reducers/creditdetails'
import { mediaType } from 'types/genre'
import { mediaID } from 'types/credit'
import {
  loadCountries,
  loadLanguages,
  loadTimezones,
} from 'reducers/configurations'
import { loadExternal } from 'reducers/external'
import { loadTrending } from 'reducers/trending'
import { trendingMediaType, trendingTime } from 'types/trending'
import { getFindID, getFindQuery } from 'api/getFind'
import { mediaType as mediaTypeFind, mediaID as mediaIDFind } from 'types/find'
import { loadFindID, loadFindQuery } from 'reducers/find'

const BrowsePage = () => {
  const dispatch = useAppDispatch()

  const getGenres = (mediaType: mediaType): void => {
    dispatch(loadGenres(mediaType))
    console.log('dispatch genres')
  }

  const getCredits = (mediaType: mediaType, mediaID: mediaID): void => {
    dispatch(loadCredits({ mediaType, mediaID }))
    console.log('dispatch credits')
  }

  const getCreditDetail = (mediaID: mediaID): void => {
    dispatch(loadCreditDetails(mediaID))
    console.log('dispatch creditdetails')
  }

  const getCountries = (): void => {
    dispatch(loadCountries())
    console.log('dispatch countries')
  }

  const getLanguages = (): void => {
    dispatch(loadLanguages())
    console.log('dispatch Languages')
  }

  const getTimezones = (): void => {
    dispatch(loadTimezones())
    console.log('dispatch Timezones')
  }

  const getExternal = (mediaType: mediaType, mediaID: mediaID): void => {
    dispatch(loadExternal({ mediaType, mediaID }))
    console.log('dispatch External')
  }

  const getTrending = (
    trendingMediaType: trendingMediaType,
    trendingTime: trendingTime,
  ): void => {
    dispatch(loadTrending({ trendingMediaType, trendingTime }))
    console.log('dispatch Trending')
  }

  const getFindID = (mediaType: mediaTypeFind, mediaID: mediaIDFind): void => {
    dispatch(loadFindID({ mediaType, mediaID }))
    console.log('dispatch getFindID')
  }

  const getFindQuery = (
    mediaType: mediaTypeFind,
    mediaID: mediaIDFind,
  ): void => {
    dispatch(loadFindQuery({ mediaType, mediaID }))
    console.log('dispatch getFindQuery')
  }

  return (
    <>
      <p>BrowsePage</p>
      <Title title="myTitle" level={1} link="/auth/movies" />
      <Button type="primary" onClick={() => getFindID('movie', '17302')}>
        Find ID
      </Button>
      <Button type="primary" onClick={() => getFindQuery('movie', 'Alice')}>
        Find Query
      </Button>
      {/* <Button type="primary" onClick={() => getGenres('movie')}>
        Get Movies Genres
      </Button>
      <Button type="primary" onClick={() => getGenres('tv')}>
        Get TV Shows Genres
      </Button>
      <Button type="primary" onClick={() => getCredits('movie', '17302')}>
        Get Movies Credits
      </Button>
      <Button type="primary" onClick={() => getCredits('tv', '115036')}>
        Get TV Shows Credits
      </Button>
      <Button
        type="primary"
        onClick={() => getCreditDetail('52fe47169251416c7508d5c7')}
      >
        Get CreditDetails
      </Button>
      <Button type="primary" onClick={getCountries}>
        Get Countries
      </Button>
      <Button type="primary" onClick={getLanguages}>
        Get Languages
      </Button>
      <Button type="primary" onClick={getTimezones}>
        Get Timezones
      </Button>
      <Button type="primary" onClick={() => getExternal('movie', '17302')}>
        Get Externals
      </Button>
      <Button type="primary" onClick={() => getTrending('movie', 'week')}>
        Get Trending Movie Week
      </Button>
      <Button type="primary" onClick={() => getTrending('movie', 'day')}>
        Get Trending Movie Day
      </Button>
      <Button type="primary" onClick={() => getTrending('tv', 'week')}>
        Get Trending TV Week
      </Button>
      <Button type="primary" onClick={() => getTrending('tv', 'day')}>
        Get Trending TV Day
      </Button>
      <Button type="primary" onClick={() => getTrending('all', 'week')}>
        Get Trending All Week
      </Button>
      <Button type="primary" onClick={() => getTrending('all', 'day')}>
        Get Trending All Day
      </Button> */}
    </>
  )
}

export default BrowsePage
