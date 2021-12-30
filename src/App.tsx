import React from 'react'
import { Layout } from 'antd'
import routes from 'routes'
import './App.css'
import { useRoutes } from 'react-router'

const App: React.FC = (): JSX.Element => {
  const { Header, Content, Footer } = Layout
  const isLoggedIn = true
  const routing = useRoutes(routes(isLoggedIn))

  return (
    <div className="App">
      <Layout>
        <Header>Header</Header>
      </Layout>
      <Layout>
        <Content>{routing}</Content>
      </Layout>
      <Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  )
}

export default App
