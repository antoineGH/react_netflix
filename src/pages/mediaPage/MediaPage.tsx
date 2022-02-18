import { Breadcrumb } from 'antd'
import CustomLink from 'components/header/menuHeader/utils/CustomLinks'
import { useAppSelector } from 'hooks/hooks'
import { getListSelector } from 'reducers/list'
import { getMovieSelector } from 'reducers/movie'

const MediaPage = () => {
  const movie = useAppSelector(getMovieSelector)
  const list = useAppSelector(getListSelector)

  console.log(movie)

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <CustomLink to="/auth/browse">Home</CustomLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <CustomLink to="/auth/list">My Lists</CustomLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <CustomLink to={list ? `/auth/list/${list.list_id}` : '/auth/list'}>
            {list ? list.list_title : 'My List'}
          </CustomLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {movie.media_type === 'movie' ? movie.title : movie.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <p>{movie.media_type === 'movie' ? movie.title : movie.name}</p>
    </>
  )
}

export default MediaPage
