import { useState } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { Switch } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useAppSelector } from 'hooks/hooks'
import { getAccountSelector } from 'reducers/account'
import FormEditAccount from 'components/formEditAccount/FormEditAccount'
import AccountDetails from 'components/accountDetails/AccountDetails'

const AccountPage = () => {
  useDocumentTitle('Account')
  const account = useAppSelector(getAccountSelector)
  const [manageAccount, setManageAccount] = useState(false)

  const handleClickManage = (): void => {
    setManageAccount(!manageAccount)
  }

  return (
    <>
      {manageAccount ? <p>Edit Account</p> : <p>My Account</p>}

      {manageAccount ? (
        <FormEditAccount account={account} />
      ) : (
        <AccountDetails account={account} />
      )}

      <Switch
        checkedChildren={<SettingOutlined />}
        unCheckedChildren={<SettingOutlined />}
        checked={manageAccount}
        onClick={handleClickManage}
        size="default"
      />
    </>
  )
}

export default AccountPage
