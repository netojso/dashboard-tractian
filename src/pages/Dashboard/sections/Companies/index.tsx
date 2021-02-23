import React, { useState } from 'react';

import { Avatar, Button, Card, Carousel, Col, DatePicker, Form, Input, InputNumber, Layout, Modal, Row, Select, Slider, Table, Tag, Tree, Upload } from 'antd';

import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusCircleOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

const { Header, Content, Footer, Sider } = Layout;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


const Companies: React.FC = () => {
  const [isOpenNewItemModal, setIsOpenNewItemModal] = useState(false);
  return (
    <Content
    style={{
    background: '#fff',
      margin: '12px 16px',
      padding: 24,
      minHeight: 280,
    }}
  >
    <Row style={{marginBottom: 10}}>
      <Col span={4} offset={21}>
      <Button
      onClick={() => setIsOpenNewItemModal(true)}
      type="primary"
      shape="circle"
      icon={<DeleteOutlined style={{fontSize: 20, color: '#fff'}} />} />

      <Button
      onClick={() => setIsOpenNewItemModal(true)}
      type="primary"
      shape="circle"
      icon={<EditOutlined style={{fontSize: 20, color: '#fff'}} />} />

      <Button
      onClick={() => setIsOpenNewItemModal(true)}
      type="primary"
      shape="circle"
      icon={<PlusCircleOutlined style={{fontSize: 20, color: '#fff'}} />} />
      </Col>
    </Row>
    <Table rowSelection={rowSelection} dataSource={data} columns={columns}
     onRow={(record, rowIndex) => {
      return {
        onClick: event => {},
      };
    }} />
    <Modal
      style={{minWidth: 700, padding: "0px 40px", top: 20}}
      visible={isOpenNewItemModal}
      title="Novo item"
      onOk={() => setIsOpenNewItemModal(false)}
      onCancel={() => setIsOpenNewItemModal(false)}
      okText="Adicionar"
      cancelText="Cancelar"
    >
      <Form name="validate_other">
      <strong>Geral</strong>
        <Row gutter={24} >
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
          <Form.Item
            name="select"
            label="Status">
              <Select defaultValue="inAlert" onChange={(e) => console.log(e)}>
                <Select.Option value="inAlert">Em alerta</Select.Option>
                <Select.Option value="inOperation">Em operação</Select.Option>
                <Select.Option value="inDowntime">Em parada</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>    
    </Modal>
</Content>
    );
}

export default Companies;