import { useEffect, useState } from 'react'
import { Modal, Button, Alert } from 'antd'
import { Movie } from 'types/movie'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  deleteMovieLoadingSelector,
  deleteMovieErrorSelector,
  removeMovie,
} from 'reducers/movie'

interface props {
  movie: Movie
  visible: boolean
  setVisible: (bool: boolean) => void
}

const ModalMedia = ({ movie, visible, setVisible }: props) => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)

  const isLoadingDeleteMovie = useAppSelector(deleteMovieLoadingSelector)
  const hasErrorDeleteMovie = useAppSelector(deleteMovieErrorSelector)

  useEffect(() => {
    if (hasErrorDeleteMovie) {
      setError('Impossible to delete movie')
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorDeleteMovie, error])

  const deleteMovie = (movieID: number) => {
    dispatch(removeMovie(movieID))
    setVisible(false)
  }

  return (
    <Modal
      title="Modal"
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      {error && <Alert message={error} type="error" />}
      <p>{movie.tmdb_id}</p>

      <Button
        loading={isLoadingDeleteMovie}
        onClick={() => deleteMovie(movie.movie_id)}
      >
        Delete
      </Button>
    </Modal>
  )
}

export default ModalMedia
