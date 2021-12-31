import { menuArray } from './menuArray'
import CustomLink from './utils/CustomLinks'

const MenuHeader = () => {
  return (
    <>
      {menuArray.map(menu => {
        return (
          <CustomLink key={menu.name} to={menu.path}>
            {menu.name}
          </CustomLink>
        )
      })}
    </>
  )
}

export default MenuHeader
