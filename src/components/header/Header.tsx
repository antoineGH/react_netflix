import MenuHeader from './menuHeader/MenuHeader'
import Search from './search/Search'
import { Row, Col } from 'antd'
import './styles.css'

const Header = () => {
  return (
    <Row className="row-header">
      <Col>Logo</Col>
      <Col>
        <MenuHeader />
      </Col>
      <Col>
        <Search />
      </Col>
    </Row>
  )
}

export default Header
