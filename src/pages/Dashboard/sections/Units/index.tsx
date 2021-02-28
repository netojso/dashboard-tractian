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
  company: string;
  assets: number;
}

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    title: 'Empresa',
    dataIndex: 'company',
  },
  {
    title: 'Ativos',
    dataIndex: 'assets',
  },

];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[]) => {console.log(selectedRowKeys)},
};


const Units: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<{value: number, display: string}[]>([]);

  const [openNewItemModal, setOpenNewItemModal] = useState(false);
  const [tableData, setTableData] = useState<any>();

  useEffect(() => {
    async function loadData() {
        const {data: assetsData} = await api.get<Asset[]>('/assets');
        const {data: companiesData} = await api.get<Company[]>('/companies');
        const {data: unitsData} = await api.get<Unit[]>('/units');

        const teste = companiesData.map(company => {
          return {value: company.id, display: company.name }
        });

        setCompanies(teste);

        const data = unitsData?.map(unit => {
          return {
            key: unit.id,
            name: unit.name,
            company: companiesData?.find(c => c.id === unit.companyId)?.name,
            assets: assetsData?.map(a => a.unitId === unit.id)?.length
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

   <NewItemModal selectCompanies={companies} openNewItemModal={openNewItemModal} toggleModal={setOpenNewItemModal} />

</Content>
    );
}

export default Units;
