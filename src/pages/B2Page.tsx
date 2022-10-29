import React, {useEffect, useState} from 'react';
import {Button, Col, Popconfirm, Row, Space, Table} from 'antd';
import API from '../api/api-types';
import {deleteContactById, getContactByName, getContacts} from '../api/contacts-api';
import EditContactModal from '../components/editContactModal';
import AddContactModal from '../components/addContactModal';
import Search from 'antd/es/input/Search';

const B2Page: React.FC = () => {
  const [contacts, setContacts] = useState<API.Contact[]>()
  const [loading, setLoading] = useState(false)

  const [contactToBeEdited, setContactToBeEdited] = useState<API.Contact>();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

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

  const handleOnSearch = (name: string) => {
    setLoading(true)
    getContactByName(name).then((res) => {
      if (res.status === 404) {
        setContacts([])
        setLoading(false);
        return
      }

      if (res.status !== 200) {
        console.log('error')
        setLoading(false);
        return
      }

      setContacts([res.data])
      setLoading(false);
    })
  }

  const handleDeleteContact = (id: number) => {
    setLoading(true);
    deleteContactById(id).then((res) => {
      if (res.status !== 200) {
        console.log('error')
        setLoading(false);
        return
      }

      const filteredContacts = contacts?.filter((contact) => contact._id !== id)
      setContacts(filteredContacts)
      setLoading(false);
    })
  }

  const handleClearContacts = () => {
    setContacts([]);
  }

  const handleOpenEditModal = (contact: API.Contact) => {
    setContactToBeEdited(contact)
    setOpenEditModal(true)
  }

  const handleOpenAddModal = () => {
    setOpenAddModal(true)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      width: '40%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '15%',
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
    <Row gutter={[0, 24]} justify="space-between">
      <Col flex="700px">
        <Row gutter={[10, 24]} justify="start">
          <Col flex="320px">
            <Search placeholder={'Search by name'} onSearch={handleOnSearch} enterButton loading={loading}/>
          </Col>

          <Col flex="50px">
            <Button type="primary" onClick={handleGetContacts} block>
              Get all contacts
            </Button>
          </Col>

          <Col flex="50px">
            <Button onClick={handleClearContacts} block>
              Clear
            </Button>
          </Col>
        </Row>
      </Col>

      <Col flex="100px">
        <Button type="primary" onClick={handleOpenAddModal}>
          Add contact
        </Button>
      </Col>

      <Col span={24}>
        <Table
          dataSource={contacts}
          columns={columns}
          rowKey={(contact) => contact._id}
          loading={loading}
          pagination={{
            pageSize: 8
          }}
        />
      </Col>

      {contactToBeEdited && openEditModal &&
          <EditContactModal open={openEditModal} setOpen={setOpenEditModal} toBeEdited={contactToBeEdited}
                            callBack={handleGetContacts}/>}

      <AddContactModal open={openAddModal} setOpen={setOpenAddModal} callBack={handleGetContacts}/>
    </Row>
  )
}

export default B2Page;