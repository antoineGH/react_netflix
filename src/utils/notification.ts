import { notification } from 'antd'

type Type = 'success' | 'info' | 'warning' | 'error'

export const openNotificationWithIcon = (
  type: Type,
  message: string,
  description: string,
) => {
  notification[type]({ message: message, description: description })
}
