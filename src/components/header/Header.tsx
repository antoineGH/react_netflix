import MenuHeader from './menuHeader/MenuHeader'
import Search from './search/Search'
import { Row, Col } from 'antd'
import CustomLink from './menuHeader/utils/CustomLinks'
import { logout } from 'hooks/useAuth'

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
        <CustomLink onClick={() => logout()} key="logout" to="/">
          Logout
        </CustomLink>
      </Col>
    </Row>
  )
}

export default Header
