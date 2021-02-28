import React, { useEffect, useState } from 'react';
import '../../../../App.css';

import { Layout, Table } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import TableOptions from '../../components/TableOptions';
import NewItemModal from './components/NewItemModal';
import { Asset } from '../../../../@types/asset';
import { Company } from '../../../../@types/company';
import { Unit } from '../../../../@types/unit';
import api from '../../../../services/api';


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

const Companies: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<any>();

  const [selectedTableRows, setSelectedTableRows] = useState<React.Key[]>([]);
  const [openNewItemModal, setOpenNewItemModal] = useState(false);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {setSelectedTableRows(selectedRowKeys)},
  };

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
    <Layout.Content className="layoutContent">

    <TableOptions openModal={setOpenNewItemModal} selectedTableRows={selectedTableRows}/>

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

</Layout.Content>
    );
}

export default Companies;
