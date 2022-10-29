import React, {useState} from 'react';
import {Col, Form, Input, InputNumber, Modal, Row} from 'antd';
import API from '../api/api-types';
import {addNewContact} from '../api/contacts-api';

type AddContactModalProp = {
  open: boolean;
  setOpen: (open: boolean) => void;
  callBack: () => void;
}

const AddContactModal: React.FC<AddContactModalProp> = (props: AddContactModalProp) => {
  const {open, setOpen, callBack} = props
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false)

  const handleFormSubmit = (newContact: API.Contact) => {
    setLoading(true)
    addNewContact(newContact).then((res) => {
      if (res.status !== 200) {
        console.log(res.statusText)
        setLoading(false)
        return
      }

      setLoading(false)
      setOpen(false)
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
        autoComplete="off"
        requiredMark={false}
      >
        <Row gutter={[0, 0]}>
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
              <InputNumber controls={false} style={{width: '100%'}}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddContactModal