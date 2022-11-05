import React, {useState} from 'react';
import {Button, Col, Popconfirm, Row, Space, Table, Tag, Tooltip, Typography} from 'antd';
import {getCurrencies} from '../api/currencies-api';
import API from '../api/api-types';

const B4Page: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<API.CurrencyRate[]>([]);

  const handleGetCurrencies = () => {
    setLoading(true)
    getCurrencies().then((res) => {
      if (res.status !== 200) {
        console.log('error')
        setLoading(false);
        return
      }

      const converted: API.CurrencyRate[] = [];

      for (const prop in res.data) {
        if (Object.prototype.hasOwnProperty.call(res.data, prop)) {
          const rate: API.CurrencyRate = {
            symbol: prop,
            rate: res.data[prop]
          }

          converted.push(rate);
        }
      }

      setData(converted)
      setLoading(false);
    })
  }

  const handleClearTable = () => {
    setData([]);
  }

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      width: '50%',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      width: '50%',
    }
  ];

  return (
    <Row gutter={[0, 24]} justify="space-between">
      <Col flex="250px">
        <Row gutter={[10, 24]} justify="start">
          <Col flex="100px">
            <Button type={'primary'} onClick={handleGetCurrencies} loading={loading} block>
              <Tooltip title="Getting the currency rates of top 10 Asian countries in terms of GDP per capita">
                <span>Get currencies</span>
              </Tooltip>
            </Button>
          </Col>

          <Col flex="100px">
            <Button onClick={handleClearTable} block>
              Clear
            </Button>
          </Col>
        </Row>
      </Col>

      <Col flex="100px">
        <Row gutter={[5, 0]}>
          <Col>
            <Typography.Text strong>
              Base:
            </Typography.Text>
          </Col>

          <Col>
            <Tag color="#87d068">
              SGD
            </Tag>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(rate) => rate.symbol}
          loading={loading}
        />
      </Col>
    </Row>
  );
}

export default B4Page;
