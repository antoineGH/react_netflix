import useDocumentTitle from 'hooks/useDocumentTitle'
import requestLogin from 'api/requestLogin'
import { login } from 'hooks/useAuth'
import { useNavigate } from 'react-router'
import { Form, Input, Button } from 'antd'

const LoginPage = () => {
  useDocumentTitle('Login')
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    const { username, password } = values
    requestLogin(username, password)
      .then(response => {
        if (response.hasOwnProperty('message')) {
          console.log(response.message)
          return
        }
        login(response)
        navigate('/')
      })
      .catch(error => {
        console.log(error)
        return
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginPage
