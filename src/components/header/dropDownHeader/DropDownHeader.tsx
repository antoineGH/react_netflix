import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { getUsersSelector, selectUser, resetUser } from 'reducers/user'
import { User } from 'types/user'
import { Menu, Dropdown } from 'antd'
import { useNavigate } from 'react-router'
import { logout } from 'hooks/useAuth'

const DropDownHeader = () => {
  const users = useAppSelector(getUsersSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSelectUser = (user: User, count: number) => {
    dispatch(selectUser(user.user_id))
    navigate('auth/browse')
  }

  const handleManageProfile = (): void => {
    dispatch(resetUser())
  }

  const handleManageAccount = (): void => {
    navigate('auth/account')
  }

  const handleLogout = (): void => {
    logout()
    navigate('')
  }

  const menu = (
    <Menu>
      {users.map((user, count) => {
        count++
        return (
          <Menu.Item
            key={user.profile}
            onClick={() => handleSelectUser(user, count)}
          >
            {user.profile}
          </Menu.Item>
        )
      })}
      <Menu.Item key="manageProfile" onClick={handleManageProfile}>
        Manage Profiles
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="manageAccount" onClick={handleManageAccount}>
        Account
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <a
        className="ant-dropdown-link"
        href={'#account'}
        onClick={e => e.preventDefault()}
      >
        Account
      </a>
    </Dropdown>
  )
}
export default DropDownHeader
