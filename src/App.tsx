import React, { useEffect } from 'react'
import routes from 'routes'
import { useRoutes } from 'react-router'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import Header from 'components/header/Header'
import Footer from 'components/footer/Footer'
import { useAuth } from 'hooks/useAuth'
import { Layout } from 'antd'
import './App.css'
import { loadAccount, getAccountSelector } from 'reducers/account'
import { getUserSelector } from 'reducers/user'
import UserPage from 'pages/userPage/UserPage'

const App: React.FC = (): JSX.Element => {
  const { Header: AntdHeader, Content, Footer: AntdFooter } = Layout
  const [logged] = useAuth()
  const dispatch = useAppDispatch()
  const routing = useRoutes(routes(logged))
  const account = useAppSelector(getAccountSelector)
  const user = useAppSelector(getUserSelector)

  useEffect(() => {
    if (logged) {
      if (!account.hasOwnProperty('account_id')) {
        dispatch(loadAccount())
      }
    }
  }, [dispatch, logged, account])

  return (
    <div className="App">
      {logged && !user.hasOwnProperty('account_id') ? (
        <UserPage />
      ) : (
        <>
          <Layout>
            <AntdHeader style={{ background: 'pink' }}>
              <Header />
            </AntdHeader>
          </Layout>
          <Layout className="layout-content">
            <Content>{routing}</Content>
          </Layout>
          <Layout>
            <AntdFooter style={{ background: 'pink' }}>
              <Footer />
            </AntdFooter>
          </Layout>
        </>
      )}
    </div>
  )
}

export default App
