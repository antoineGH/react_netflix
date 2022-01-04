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

  return (
    <>
      <p>BrowsePage</p>
      <Title title="myTitle" level={1} link="/auth/movies" />
      <Button type="primary" onClick={() => getGenres('movie')}>
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
    </>
  )
}

export default BrowsePage
