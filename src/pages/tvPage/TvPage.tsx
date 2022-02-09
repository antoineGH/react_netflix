import useDocumentTitle from 'hooks/useDocumentTitle'
import { useEffect } from 'react'
import { useAppSelector } from 'hooks/hooks'
import { getTrendingSelector } from 'reducers/trending'
import { getGenreSelector } from 'reducers/genres'

import { getExternalSelector } from 'reducers/external'
import { getDiscoverSelector } from 'reducers/discover'
import { getCreditsSelector } from 'reducers/credits'
import { getCreditDetailsSelector } from 'reducers/creditdetails'

const TvPage = () => {
  useDocumentTitle('TV Shows')
  const trending = useAppSelector(getTrendingSelector)
  const genres = useAppSelector(getGenreSelector)
  const external = useAppSelector(getExternalSelector)
  const discover = useAppSelector(getDiscoverSelector)
  const credits = useAppSelector(getCreditsSelector)
  const creditdetails = useAppSelector(getCreditDetailsSelector)

  useEffect(() => {
    console.log(trending)
    console.log(genres)
    console.log(external)
    console.log(discover)
    console.log(credits)
    console.log(creditdetails)
  }, [])
  return <p>TvPage</p>
}

export default TvPage
