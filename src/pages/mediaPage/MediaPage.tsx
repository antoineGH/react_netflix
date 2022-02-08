import { useAppSelector } from 'hooks/hooks'
import { useParams } from 'react-router'
import { getMovieSelector } from 'reducers/movie'

const MediaPage = () => {
  const params = useParams()
  const mediaID = params.mediaID
  const movie = useAppSelector(getMovieSelector)
  console.log(movie)

  return (
    <>
      <p>{movie.title}</p>
    </>
  )
}

export default MediaPage
