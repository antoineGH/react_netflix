import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import AuthApp from 'layouts/AuthApp'
import UnAuthApp from 'layouts/UnAuthApp'
import './App.css'

function App() {
  const { Header, Content, Footer } = Layout
  const logged = true

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Header>Header</Header>
        </Layout>
        <Layout>
          <Content>
            <Routes>
              {logged ? (
                <Route index element={<AuthApp />} />
              ) : (
                <Route index element={<UnAuthApp />} />
              )}
            </Routes>
          </Content>
        </Layout>
        <Layout>
          <Footer>Footer</Footer>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
