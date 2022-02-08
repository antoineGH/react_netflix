import { useAppSelector } from 'hooks/hooks'
import { getMovieSelector } from 'reducers/movie'

const MediaPage = () => {
  const movie = useAppSelector(getMovieSelector)
  console.log(movie)

  return (
    <>
      <p>{movie.title}</p>
    </>
  )
}

export default MediaPage
