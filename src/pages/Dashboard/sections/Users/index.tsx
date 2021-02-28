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
import { User } from '../../../../@types/user';

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
    title: 'E-mail',
    dataIndex: 'email',
  },
  {
    title: 'Unidade',
    dataIndex: 'unit',
  },
  {
    title: 'Empresa',
    dataIndex: 'company',
  },

];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[]) => {console.log(selectedRowKeys)},
};


const Users: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<{value: number, display: string}[]>([]);
  const [units, setUnits] = useState<{value: number, display: string}[]>([]);

  const [openNewItemModal, setOpenNewItemModal] = useState(false);
  const [tableData, setTableData] = useState<any>();

  useEffect(() => {
    async function loadData() {
        const {data: usersData} = await api.get<User[]>('/users');
        const {data: companiesData} = await api.get<Company[]>('/companies');
        const {data: unitsData} = await api.get<Unit[]>('/units');

        const companiesOptions = companiesData.map(company => {
          return {value: company.id, display: company.name }
        });

        const unitsOptions = unitsData.map(unit => {
          return {value: unit.id, display: unit.name }
        });

        setCompanies(companiesOptions);
        setUnits(unitsOptions);

        const data = usersData?.map(user => {
          return {
            key: user.id,
            name: user.name,
            email: user.email,
            company: companiesData?.find(c => c.id === user.companyId)?.name,
            unit: unitsData?.find(u => u.id === user.id)?.name
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

   <NewItemModal selectCompanies={companies} selectUnits={units} openNewItemModal={openNewItemModal} toggleModal={setOpenNewItemModal} />

</Content>
    );
}

export default Users;
