import Title from '../../components/title/Title'
import { Button } from 'antd'
import { useAppDispatch } from 'hooks/hooks'
import { loadGenres } from 'reducers/genres'

const BrowsePage = () => {
  const dispatch = useAppDispatch()

  const handleClick = (): void => {
    dispatch(loadGenres('movie'))
    console.log('dispatch')
  }

  return (
    <>
      <p>BrowsePage</p>
      <Title title="myTitle" level={1} link="/auth/movies" />
      <Button type="primary" onClick={() => handleClick()}>
        Get Genres
      </Button>
    </>
  )
}

export default BrowsePage
