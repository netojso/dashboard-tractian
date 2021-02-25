import React, { useState } from 'react';

import { Avatar, Button, Card, Carousel, Col, DatePicker, Form, Input, InputNumber, Layout, Modal, Row, Select, Slider, Table, Tag, Tree, Upload } from 'antd';

import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusCircleOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import TableOptions from '../../components/TableOptions';
import NewItemModal from './components/NewItemModal';

const { Header, Content, Footer, Sider } = Layout;

interface DataType {
  key: React.Key;
  name: string;
  company: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    company: 'New York No. 1 Lake Park',
  }
];

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    title: 'Empresa',
    dataIndex: 'age',
  }
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


const Units: React.FC = () => {
  const [openNewItemModal, setOpenNewItemModal] = useState(false);

  return (
    <Content
    style={{
    background: '#fff',
      margin: '20px 16px',
      padding: 24,
      minHeight: 280,
    }}
  >
    <TableOptions openModal={setOpenNewItemModal} />

    <Table rowSelection={rowSelection} dataSource={data} columns={columns} />
   
   <NewItemModal openNewItemModal={openNewItemModal} toggleModal={setOpenNewItemModal} />

</Content>
    );
}

export default Units;