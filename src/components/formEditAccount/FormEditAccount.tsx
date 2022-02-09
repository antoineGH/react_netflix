import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  getUpdateAccountLoadingSelector,
  getUpdateAccountErrorSelector,
  updateAccount,
} from 'reducers/account'
import ModalDeleteAccount from 'components/modalDeleteAccount/ModalDeleteAccount'
import { Button, Form, Input } from 'antd'
import { Account } from 'types/account'

interface props {
  account: Account
}

const FormEditAccount = ({ account }: props) => {
  const [deleteAccount, setDeleteAccount] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const isLoadingUpdateAccount = useAppSelector(getUpdateAccountLoadingSelector)
  const hasErrorUpdateAccount = useAppSelector(getUpdateAccountErrorSelector)
  const [form] = Form.useForm()

  useEffect(() => {
    if (hasErrorUpdateAccount) {
      setError('Impossible to update account')
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorUpdateAccount, error])

  const onFinish = (values: any) => {
    let { firstname, lastname, password } = values

    if (firstname === account.first_name) {
      firstname = null
    }
    if (lastname === account.last_name) {
      lastname = null
    }

    if (!password) {
      password = null
    }

    dispatch(
      updateAccount({ password, firstName: firstname, lastName: lastname }),
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          email: account.email,
          firstname: account.first_name,
          lastname: account.last_name,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: false,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: false,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                )
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={() => setDeleteAccount(!deleteAccount)}>
            Delete Account
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoadingUpdateAccount}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
      {deleteAccount && (
        <ModalDeleteAccount
          visible={deleteAccount}
          setVisible={setDeleteAccount}
        />
      )}
    </>
  )
}
export default FormEditAccount
