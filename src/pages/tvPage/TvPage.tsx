import useDocumentTitle from 'hooks/useDocumentTitle'
import { useEffect } from 'react'
import { useAppSelector } from 'hooks/hooks'
import { getTrendingSelector } from 'reducers/trending'
import { getGenreSelector } from 'reducers/genres'
import { getFindIDSelector } from 'reducers/find'
import { getExternalSelector } from 'reducers/external'
import { getDiscoverSelector } from 'reducers/discover'
import { getCreditsSelector } from 'reducers/credits'
import { getCreditDetailsSelector } from 'reducers/creditdetails'
import { getCountriesSelector } from 'reducers/configurations'
import { getAccountSelector } from 'reducers/account'

const TvPage = () => {
  useDocumentTitle('TV Shows')
  const trending = useAppSelector(getTrendingSelector)
  const genres = useAppSelector(getGenreSelector)
  const findID = useAppSelector(getFindIDSelector)
  const external = useAppSelector(getExternalSelector)
  const discover = useAppSelector(getDiscoverSelector)
  const credits = useAppSelector(getCreditsSelector)
  const creditdetails = useAppSelector(getCreditDetailsSelector)
  const countries = useAppSelector(getCountriesSelector)
  const account = useAppSelector(getAccountSelector)
  useEffect(() => {
    console.log(trending)
    console.log(genres)
    console.log(findID)
    console.log(external)
    console.log(discover)
    console.log(credits)
    console.log(creditdetails)
    console.log(countries)
    console.log(account)
  }, [])
  return <p>TvPage</p>
}

export default TvPage
