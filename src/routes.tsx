import { Navigate } from 'react-router-dom'
import UnAuthApp from 'layouts/UnAuthApp'
import Login from 'pages/login/Login'
import Register from 'pages/register/Register'
import AuthApp from 'layouts/AuthApp'
import Browse from 'pages/browse/Browse'
import Account from 'pages/account/Account'

const routes = (isLoggedIn: Boolean) => [
  {
    path: '/auth',
    element: isLoggedIn ? <AuthApp /> : <Navigate to="/login" />,
    children: [
      { path: 'browse', element: <Browse /> },
      { path: 'account', element: <Account /> },
      { path: '/auth', element: <Navigate to="/auth/browse" /> },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <UnAuthApp /> : <Navigate to="/auth" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
]

export default routes
