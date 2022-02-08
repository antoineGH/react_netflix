import { useState, useEffect } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  loadMovies,
  getMoviesLoadingSelector,
  getMoviesErrorSelector,
  addMovie,
  addMovieLoadingSelector,
  addMovieErrorSelector,
  getMoviesSelector,
  selectMovie,
} from 'reducers/movie'
import { getListSelector } from 'reducers/list'
import { Movie, mediaType } from 'types/movie'
import { Button, Alert } from 'antd'
import { useParams, useNavigate } from 'react-router'
import ModalMedia from 'components/modalMedia/ModalMedia'

const ListMediaPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams()
  const listID = params.listID

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [manageMovie, setManageMovie] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const list = useAppSelector(getListSelector)
  const movies = useAppSelector(getMoviesSelector)
  const isLoadingMovies = useAppSelector(getMoviesLoadingSelector)
  const hasErrorMovies = useAppSelector(getMoviesErrorSelector)
  const isLoadingAddMovie = useAppSelector(addMovieLoadingSelector)
  const hasErrorAddMovie = useAppSelector(addMovieErrorSelector)

  useDocumentTitle(list ? list.list_title : 'My Videos')

  useEffect(() => {
    if (!listID) {
      redirectToList()
    }
  })

  useEffect(() => {
    if (hasErrorAddMovie) {
      setError('Impossible to add movie')
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorAddMovie, error])

  useEffect(() => {
    if (listID) {
      dispatch(loadMovies(Number(listID)))
    }
  }, [dispatch, listID])

  const redirectToList = (): void => {
    navigate('/auth/list')
  }

  const handleClickManage = (): void => {
    setManageMovie(!manageMovie)
  }

  const handleSelectMovie = (movie: Movie): void => {
    if (manageMovie) {
      setSelectedMovie(movie)
      setVisible(true)
      return
    }
    dispatch(selectMovie(movie.media_id))
    navigate(`${movie.media_id}`)
  }

  const createMovie = (tmdbID: number, mediaType: mediaType): void => {
    let hasExistingMovie = false
    movies.forEach(movie => {
      if (movie.tmdb_id === tmdbID) {
        hasExistingMovie = true
      }
    })
    if (hasExistingMovie) {
      setError('Movie already existing in the list')
      return
    }
    console.log('dispatch addMovie')
    dispatch(addMovie({ tmdbID, mediaType, listID: Number(listID) }))
    setVisible(false)
  }

  return (
    <>
      <p>My Videos</p>
      {error && <Alert message={error} type="error" />}
      <p>{String(manageMovie)}</p>
      {hasErrorMovies ? (
        <p>Error List</p>
      ) : isLoadingMovies ? (
        <p>Loading Lists</p>
      ) : (
        movies.map(movie => {
          return (
            <Button
              key={movie.media_id}
              onClick={() => {
                handleSelectMovie(movie)
              }}
            >
              {movie.title}
            </Button>
          )
        })
      )}
      {!hasErrorMovies && !isLoadingMovies && (
        <>
          {manageMovie && (
            <Button
              loading={isLoadingAddMovie}
              onClick={() => createMovie(666, 'movie')}
            >
              Add
            </Button>
          )}
          <div>
            <Button onClick={handleClickManage}>Manage Media</Button>
          </div>
          {selectedMovie && (
            <ModalMedia
              movie={selectedMovie}
              visible={visible}
              setVisible={setVisible}
            />
          )}
        </>
      )}
    </>
  )
}
export default ListMediaPage
