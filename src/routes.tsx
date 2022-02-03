import { Navigate } from 'react-router-dom'
import UnAuthApp from 'layouts/UnAuthApp'
import Login from 'pages/loginPage/LoginPage'
import Register from 'pages/registerPage/RegisterPage'
import AuthApp from 'layouts/AuthApp'
import BrowsePage from 'pages/browsePage/BrowsePage'
import MoviePage from 'pages/moviePage/MoviePage'
import TvPage from 'pages/tvPage/TvPage'
import NewPopularPage from 'pages/newPopularPage/NewPopularPage'
import AccountPage from 'pages/accountPage/AccountPage'
import ListPage from 'pages/listPage/ListPage'
import ListMediaPage from 'pages/listMediaPage/ListMediaPage'
import MediaPage from 'pages/mediaPage/MediaPage'

const routes = (isLoggedIn: Boolean) => [
  {
    path: '/auth',
    element: isLoggedIn ? <AuthApp /> : <Navigate to="/login" />,
    children: [
      { path: 'browse', element: <BrowsePage /> },
      { path: 'movies', element: <MoviePage /> },
      { path: 'tvs', element: <TvPage /> },
      { path: 'news', element: <NewPopularPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'list', element: <ListPage /> },
      { path: 'list/:listID', element: <ListMediaPage /> },
      { path: 'list/:listID/:mediaID', element: <MediaPage /> },
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
