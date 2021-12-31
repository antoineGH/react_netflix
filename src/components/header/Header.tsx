import MenuHeader from './menuHeader/MenuHeader'
import Search from './search/Search'
import { Row, Col } from 'antd'
import './styles.css'
import CustomLink from './menuHeader/utils/CustomLinks'

const Header = () => {
  return (
    <Row className="row-header">
      <Col>Netflix Logo</Col>
      <Col>
        <MenuHeader />
      </Col>
      <Col>
        <Search />
      </Col>
      <Col>
        <CustomLink key="account" to="auth/account">
          Account
        </CustomLink>
      </Col>
    </Row>
  )
}

export default Header
