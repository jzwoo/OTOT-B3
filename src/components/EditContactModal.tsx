import React, {useState} from 'react';
import {Col, Form, Input, Modal, Row} from 'antd';
import API from '../api/api-types';
import {editContactById} from '../api/contacts-api';

type EditContactModalProp = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toBeEdited: API.Contact;
  callBack: () => void;
}

const EditContactModal: React.FC<EditContactModalProp> = (props: EditContactModalProp) => {
  const {open, setOpen, toBeEdited, callBack} = props
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false)

  const handleFormSubmit = (values: API.Contact) => {
    console.log(values)
    const editedName = values.name
    const editedContact = values.contact

    if (!editedName || !editedContact) {
      console.log('err')
      return
    }

    setLoading(true)
    editContactById(toBeEdited._id, {name: editedName, contact: editedContact}).then((res) => {
      if (res.status !== 200) {
        console.log(res.statusText)
        setLoading(false)
        return
      }

      setLoading(false)
      setOpen(false);
      callBack();
    })
  }

  return (
    <Modal
      open={open}
      onOk={form.submit}
      onCancel={() => setOpen(false)}
      okButtonProps={{loading: loading}}
      maskClosable={false}
    >
      <Form
        onFinish={handleFormSubmit}
        form={form}
        labelCol={{
          span: 24,
        }}
        initialValues={{
          ...toBeEdited
        }}
        autoComplete="off"
        requiredMark={false}
      >
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Cannot be empty!'
                },
              ]}
            >
              <Input/>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Contact number"
              name="contact"
              rules={[
                {
                  required: true,
                  message: 'Cannot be empty!'
                },
                {
                  type: 'number',
                  message: 'Please input a number!'
                }
              ]}
            >
              <Input/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default EditContactModal