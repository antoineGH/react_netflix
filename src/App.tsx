import React from 'react'
import routes from 'routes'
import { useRoutes } from 'react-router'
import Header from 'components/header/Header'
import Footer from 'components/footer/Footer'
import { Layout } from 'antd'
import './App.css'

const App: React.FC = (): JSX.Element => {
  const { Header: AntdHeader, Content, Footer: AntdFooter } = Layout
  const isLoggedIn = true
  const routing = useRoutes(routes(isLoggedIn))

  return (
    <div className="App">
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
    </div>
  )
}

export default App
