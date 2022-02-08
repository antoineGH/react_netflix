import { useState, useEffect } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  loadMovies,
  getMoviesLoadingSelector,
  getMoviesErrorSelector,
  // addMovie,
  // addMovieLoadingSelector,
  // addMovieErrorSelector,
  getMoviesSelector,
  selectMovie,
  removeMovie,
  deleteMovieLoadingSelector,
  deleteMovieErrorSelector,
} from 'reducers/movie'
import { getListSelector } from 'reducers/list'
import { Movie } from 'types/movie'
import { Button, Alert, Switch } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router'

const ListMediaPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams()
  const listID = params.listID

  const [manageMovie, setManageMovie] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const list = useAppSelector(getListSelector)
  const movies = useAppSelector(getMoviesSelector)
  const isLoadingMovies = useAppSelector(getMoviesLoadingSelector)
  const hasErrorMovies = useAppSelector(getMoviesErrorSelector)
  // const isLoadingAddMovie = useAppSelector(addMovieLoadingSelector)
  // const hasErrorAddMovie = useAppSelector(addMovieErrorSelector)
  const isLoadingDeleteMovie = useAppSelector(deleteMovieLoadingSelector)
  const hasErrorDeleteMovie = useAppSelector(deleteMovieErrorSelector)

  useDocumentTitle(list ? list.list_title : 'My Videos')

  useEffect(() => {
    if (!listID) {
      redirectToList()
    }
  })

  useEffect(() => {
    if (listID) {
      dispatch(loadMovies(Number(listID)))
    }
  }, [dispatch, listID])

  // useEffect(() => {
  //   if (hasErrorAddMovie) {
  //     setError('Impossible to add movie')
  //   }
  //   if (error) {
  //     setTimeout(() => {
  //       setError(null)
  //     }, 2000)
  //   }
  // }, [hasErrorAddMovie, error])

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

  const redirectToList = (): void => {
    navigate('/auth/list')
  }

  const handleClickManage = (): void => {
    setManageMovie(!manageMovie)
  }

  const handleSelectMovie = (movie: Movie): void => {
    dispatch(selectMovie(movie.media_id))
    navigate(`${movie.media_id}`)
  }

  // const createMovie = (tmdbID: number, mediaType: mediaType): void => {
  //   let hasExistingMovie = false
  //   movies.forEach(movie => {
  //     if (movie.tmdb_id === tmdbID) {
  //       hasExistingMovie = true
  //     }
  //   })
  //   if (hasExistingMovie) {
  //     setError('Movie already existing in the list')
  //     return
  //   }
  //   console.log('dispatch addMovie')
  //   dispatch(addMovie({ tmdbID, mediaType, listID: Number(listID) }))
  //   setVisible(false)
  // }

  const deleteMovie = (movieID: number) => {
    dispatch(removeMovie(movieID))
  }

  return (
    <>
      <p>My Videos</p>
      {error && <Alert message={error} type="error" />}
      {hasErrorMovies ? (
        <p>Error List</p>
      ) : isLoadingMovies ? (
        <p>Loading Lists</p>
      ) : (
        movies.map(movie => {
          return (
            <div key={movie.media_id}>
              <Button
                onClick={() => {
                  handleSelectMovie(movie)
                }}
              >
                {movie.title}
              </Button>
              {manageMovie && (
                <Button
                  loading={isLoadingDeleteMovie}
                  onClick={() => deleteMovie(movie.media_id)}
                >
                  Delete
                </Button>
              )}
            </div>
          )
        })
      )}
      {!hasErrorMovies && !isLoadingMovies && (
        <>
          <div>
            <p>Manage Medias</p>
            <Switch
              checkedChildren={<SettingOutlined />}
              unCheckedChildren={<SettingOutlined />}
              checked={manageMovie}
              onClick={handleClickManage}
              size="default"
            />
          </div>
        </>
      )}
    </>
  )
}
export default ListMediaPage
