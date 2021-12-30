import React from 'react'
import { Layout } from 'antd'
import AuthApp from 'layouts/AuthApp'
import UnAuthApp from 'layouts/UnAuthApp'
import './App.css'

function App() {
  const { Header, Content, Footer } = Layout
  const logged = false

  return (
    <div className="App">
      <Layout>
        <Header>Header</Header>
      </Layout>
      <Layout>
        <Content></Content>
      </Layout>
      <Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  )
}

export default App
