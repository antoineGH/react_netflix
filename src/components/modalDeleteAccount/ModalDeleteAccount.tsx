import { Alert, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useEffect, useState } from 'react'
import {
  removeAccount,
  getDeleteAccountLoadingSelector,
  getDeleteAccountErrorSelector,
} from 'reducers/account'

interface props {
  visible: boolean
  setVisible: (bool: boolean) => void
}

const ModalDeleteAccount = ({ visible, setVisible }: props) => {
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const isLoadingDeleteAccount = useAppSelector(getDeleteAccountLoadingSelector)
  const hasErrorDeleteAccount = useAppSelector(getDeleteAccountErrorSelector)

  useEffect(() => {
    if (hasErrorDeleteAccount) {
      setError('Impossible to delete account')
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [error, hasErrorDeleteAccount])

  const delAccount = (): void => {
    dispatch(removeAccount())
    console.log('dispatch removeAccount')
    setTimeout(() => {
      setVisible(false)
    }, 700)
  }
  return (
    <Modal
      title="Delete Account"
      centered
      visible={visible}
      okText="Delete"
      okButtonProps={{
        loading: isLoadingDeleteAccount,
      }}
      onOk={delAccount}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      {error && <Alert message={error} type="error" />}
      <p>Are you sure you want to delete your account ?</p>
    </Modal>
  )
}
export default ModalDeleteAccount
