import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import React, { useEffect, useState } from 'react'
import {
  addListLoadingSelector,
  addListErrorSelector,
  unsetErrorAdd,
  addList,
} from 'reducers/list'
import { Lists } from 'types/list'
import { Form, Input, Modal, Alert } from 'antd'

interface props {
  lists: Lists
  userID: number
  visible: boolean
  setVisible: (bool: boolean) => void
}

const ModalAddList = ({ lists, userID, visible, setVisible }: props) => {
  const [listToAdd, setListToAdd] = useState('')
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const isLoadingAddList = useAppSelector(addListLoadingSelector)
  const hasErrorAddList = useAppSelector(addListErrorSelector)

  useEffect(() => {
    if (hasErrorAddList) {
      setError('Impossible to add list')
      dispatch(unsetErrorAdd())
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorAddList, error, dispatch])

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setListToAdd(e.currentTarget.value)
  }

  const createList = (newList: string) => {
    let hasExistingList = false
    lists.forEach(list => {
      if (list.list_title === newList) {
        hasExistingList = true
      }
    })
    if (hasExistingList) {
      setError('List already existing, choose a different name')
      return
    }
    dispatch(addList({ listTitle: newList, userID }))
    setVisible(false)
  }

  return (
    <Modal
      title="Create List"
      centered
      visible={visible}
      okText="Create"
      okButtonProps={{
        loading: isLoadingAddList,
      }}
      onOk={() => createList(listToAdd)}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      {error && <Alert message={error} type="error" />}

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="List"
          name="list"
          rules={[
            { required: true, message: 'Please input list name' },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "List shouldn't contain spaces or numbers",
            },
            {
              min: 3,
              message: 'List should contain at least 3 characters',
            },
            { max: 15, message: "List shouldn't exceed 15 characters" },
          ]}
        >
          <Input
            placeholder="Enter new list name"
            onChange={handleChange}
            value={listToAdd}
            disabled={isLoadingAddList}
            onPressEnter={() => createList(listToAdd)}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ModalAddList
