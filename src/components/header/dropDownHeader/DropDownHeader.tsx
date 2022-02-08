import { Menu, Dropdown } from 'antd'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { useEffect } from 'react'
import { getUsersSelector, selectUser } from 'reducers/user'
import { User } from 'types/user'
import CustomLink from '../menuHeader/utils/CustomLinks'

const DropDownHeader = () => {
  const users = useAppSelector(getUsersSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(users)
  }, [users])

  const handleSelectUser = (user: User, count: number) => {
    dispatch(selectUser(user.user_id))
  }

  const menu = (
    <Menu>
      {users.map((user, count) => {
        count++
        return (
          <Menu.Item
            key={user.user_id}
            onClick={() => handleSelectUser(user, count)}
          >
            {user.profile}
          </Menu.Item>
        )
      })}
      <Menu.Item>
        <CustomLink key="account" to="auth/account">
          Account
        </CustomLink>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown overlay={menu}>
        <a
          className="ant-dropdown-link"
          href={'#account'}
          onClick={e => e.preventDefault()}
        >
          Account
        </a>
      </Dropdown>
      ,
    </>
  )
}
export default DropDownHeader
