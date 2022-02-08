import React, { useState, useEffect } from 'react'
import { Modal, Button, Alert, Form, Input } from 'antd'
import { List, Lists } from 'types/list'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  updateListLoadingSelector,
  updateListErrorSelector,
  deleteListLoadingSelector,
  deleteListErrorSelector,
  updateList,
  removeList,
} from 'reducers/list'

interface props {
  list: List
  count: number
  lists: Lists
  visible: boolean
  setVisible: (bool: boolean) => void
}

const ModalList = ({ list, count, lists, visible, setVisible }: props) => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)
  const [listToUpdate, setListToUpdate] = useState(list.list_title)
  const isLoadingUpdateList = useAppSelector(updateListLoadingSelector)
  const hasErrorUpdateList = useAppSelector(updateListErrorSelector)
  const isLoadingDeleteList = useAppSelector(deleteListLoadingSelector)
  const hasErrorDeleteList = useAppSelector(deleteListErrorSelector)

  const [form] = Form.useForm()

  useEffect(() => form.resetFields(), [list.list_title, form])

  useEffect(() => {
    if (hasErrorUpdateList) {
      setError('Impossible to update list')
    }
    if (hasErrorDeleteList) {
      setError('Impossible to delete list')
    }
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [hasErrorUpdateList, hasErrorDeleteList, error])

  useEffect(() => {
    setListToUpdate(list.list_title)
    form.setFieldsValue({
      list: list.list_title,
    })
  }, [list.list_title, form])

  const deleteList = (listID: number) => {
    if (lists.length <= 1) {
      setError('Impossible to delete default list')
      return
    }
    dispatch(removeList(listID))
    setVisible(false)
  }

  const putList = (listID: number, newList: string) => {
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
    dispatch(updateList({ listTitle: newList, listID }))
    setListToUpdate('')
    setTimeout(() => {
      setVisible(false)
    }, 700)
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setListToUpdate(e.currentTarget.value)
  }

  return (
    <Modal
      getContainer={false}
      title="List Settings"
      centered
      visible={visible}
      okText="Update"
      okButtonProps={{
        loading: isLoadingUpdateList,
      }}
      onOk={() => putList(list.list_id, listToUpdate)}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      {error && <Alert message={error} type="error" />}
      <p>{list.list_title}</p>

      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="List"
          name="list"
          rules={[
            { required: true, message: 'Please input your list name' },
            {
              pattern: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
              message: "List name shouldn't contain spaces or numbers",
            },
            {
              min: 3,
              message: 'List name should contain at least 3 characters',
            },
            { max: 25, message: "List name shouldn't exceed 25 characters" },
          ]}
        >
          <Input
            id="input"
            name="input"
            onChange={handleChange}
            placeholder={listToUpdate}
            disabled={isLoadingUpdateList}
            onPressEnter={() => putList(list.list_id, listToUpdate)}
          />
        </Form.Item>
      </Form>
      {count !== 1 && (
        <Button
          loading={isLoadingDeleteList}
          onClick={() => deleteList(list.list_id)}
        >
          Delete
        </Button>
      )}
    </Modal>
  )
}

export default ModalList
