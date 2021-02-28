import React, { useEffect, useState } from 'react';
import './styles.css';

import { Layout, Table } from 'antd';

import TableOptions from '../../components/TableOptions';
import NewItemModal from './components/NewItemModal';
import { Asset } from '../../../../@types/asset';
import { Company } from '../../../../@types/company';
import { Unit } from '../../../../@types/unit';
import api from '../../../../services/api';
import { SyncOutlined } from '@ant-design/icons';

const { Content } = Layout;

interface DataType {
  key: React.Key;
  name: string;
}

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
  const [loading, setLoading] = useState(true);

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

        setLoading(false);

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

      {!loading ? (
        <Table
          rowSelection={rowSelection}
          dataSource={tableData}
          columns={columns}
          />
      ): (
        <SyncOutlined className='spinLoading' spin />
      )}

    <NewItemModal openNewItemModal={openNewItemModal} toggleModal={setOpenNewItemModal} />

</Content>
    );
}

export default Companies;
