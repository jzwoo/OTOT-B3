import React, {useState} from 'react';
import {Button, Col, Popconfirm, Row, Space, Table} from 'antd';
import API from '../api/api-types';
import {deleteContactById, getContacts} from '../api/contacts-api';
import EditContactModal from '../components/EditContactModal';

const B2Page: React.FC = () => {
  const [contacts, setContacts] = useState<API.Contact[]>()
  const [loading, setLoading] = useState(false)

  const [contactToBeEdited, setContactToBeEdited] = useState<API.Contact>();
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleGetContacts = () => {
    setLoading(true);
    getContacts().then((res) => {
      if (res.status !== 200) {
        console.log('error')
        setLoading(false);
        return
      }

      setContacts(res.data)
      setLoading(false);
    })
  }

  const handleDeleteContact = (id: number) => {
    setLoading(loading);
    deleteContactById(id).then((res) => {
      if (res.status !== 200) {
        console.log('error')
        setLoading(false);
        return
      }

      const filteredContacts = contacts?.filter((contact) => contact._id !== id)
      setContacts(filteredContacts)
    })
  }

  const handleClearContacts = () => {
    setContacts([]);
  }

  const handleOpenEditModal = (contact: API.Contact) => {
    setContactToBeEdited(contact);
    setOpenEditModal(true)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      fixed: true,
      render: (_: any, contact: API.Contact) => (
        <Space size="middle" align="center">
          <Button type="link" onClick={() => handleOpenEditModal(contact)}>
            Edit
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => handleDeleteContact(contact._id)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Row gutter={[10, 24]} justify="start">
      <Col flex="100px">
        <Button type="primary" onClick={handleGetContacts}>
          Get all contacts
        </Button>
      </Col>

      <Col flex="100px">
        <Button type="primary" onClick={handleClearContacts}>
          Clear contacts
        </Button>
      </Col>

      <Col span={24}>
        <Table dataSource={contacts} columns={columns} rowKey={(contact) => contact._id} loading={loading}/>
      </Col>

      {contactToBeEdited &&
          <EditContactModal open={openEditModal} setOpen={setOpenEditModal} toBeEdited={contactToBeEdited}
                            callBack={handleGetContacts}/>}
    </Row>
  )
}

export default B2Page;