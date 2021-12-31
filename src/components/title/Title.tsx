import { Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title: AntdTitle } = Typography

type Props = {
  title: string
  level: 5 | 1 | 2 | 3 | 4 | undefined
  link: string
}

const Title = (props: Props) => {
  const { title, level, link } = props
  return (
    <Link to={link}>
      <AntdTitle level={level}>{title}</AntdTitle>{' '}
    </Link>
  )
}

export default Title
