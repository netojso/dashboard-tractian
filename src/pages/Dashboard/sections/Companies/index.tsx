import React, { useEffect, useState } from 'react';

import { Avatar, Button, Card, Carousel, Col, DatePicker, Form, Input, InputNumber, Layout, Modal, Row, Select, Slider, Table, Tag, Tree, Upload } from 'antd';

import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusCircleOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import TableOptions from '../../components/TableOptions';
import NewItemModal from './components/NewItemModal';
import { Asset } from '../../../../@types/asset';
import { Company } from '../../../../@types/company';
import { Unit } from '../../../../@types/unit';
import api from '../../../../services/api';

const { Header, Content, Footer, Sider } = Layout;

interface DataType {
  key: React.Key;
  name: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
  }
];

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    title: 'Ativos',
    dataIndex: 'assets',
  },
  {
    title: 'Unidades',
    dataIndex: 'units',
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


const Companies: React.FC = () => {
  const [openNewItemModal, setOpenNewItemModal] = useState(false);
  const [tableData, setTableData] = useState<any>();

  useEffect(() => {
    async function loadData() {
        const {data: assetsData} = await api.get<Asset[]>('/assets');
        const {data: companiesData} = await api.get<Company[]>('/companies');
        const {data: unitsData} = await api.get<Unit[]>('/units');

        const data = companiesData?.map(company => {
          return {
            key: company.id,
            name: company.name,
            units: unitsData?.map(u => u.companyId === company.id)?.length,  
            assets: assetsData?.map(a => a.companyId === company.id)?.length
          }
        })

        if(data !== undefined) setTableData(data);

    }

    loadData();
}, [])


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
    
    <Table rowSelection={rowSelection} dataSource={tableData} columns={columns} />

    <NewItemModal openNewItemModal={openNewItemModal} toggleModal={setOpenNewItemModal} />
   
</Content>
    );
}

export default Companies;