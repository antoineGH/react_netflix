import { Link } from 'react-router-dom'
import { menuArray } from './menuArray'
import { useResolvedPath, useMatch } from 'react-router'
import type { LinkProps } from 'react-router-dom'

const MenuHeader = () => {
  function CustomLink({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to)
    let match = useMatch({ path: resolved.pathname, end: true })

    return (
      <Link
        style={{ textDecoration: match ? 'underline' : 'none' }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    )
  }

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
