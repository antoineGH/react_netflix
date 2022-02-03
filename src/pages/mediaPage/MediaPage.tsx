import { useParams } from 'react-router'

const MediaPage = () => {
  const params = useParams()
  const mediaID = params.mediaID
  console.log(mediaID)
  return (
    <>
      <p>MediaPAGE getMovieDetails</p>
    </>
  )
}

export default MediaPage
