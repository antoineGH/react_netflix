import { Typography } from 'antd'

const { Title: AntdTitle } = Typography

type Props = { title: string; level: 5 | 1 | 2 | 3 | 4 | undefined }

const Title = (props: Props) => {
  const { title, level } = props
  return <AntdTitle level={level}>{title}</AntdTitle>
}

export default Title
