import React, { useEffect, useState } from 'react';
import '../../../../App.css';

import { Layout, Table } from 'antd';

import TableOptions from '../../components/TableOptions';
import NewItemModal from './components/NewItemModal';
import { Company } from '../../../../@types/company';
import { Unit } from '../../../../@types/unit';
import api from '../../../../services/api';
import { SyncOutlined } from '@ant-design/icons';
import { User } from '../../../../@types/user';


const Users: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTableRows, setSelectedTableRows] = useState<React.Key[]>([]);

  const [companies, setCompanies] = useState<{value: number, display: string}[]>([]);
  const [units, setUnits] = useState<{value: number, display: string}[]>([]);

  const [openNewItemModal, setOpenNewItemModal] = useState(false);
  const [tableData, setTableData] = useState<any>();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {setSelectedTableRows(selectedRowKeys)},
  };

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
    <Layout.Content className="layoutContent">
      <TableOptions openModal={setOpenNewItemModal} selectedTableRows={selectedTableRows} />

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

  </Layout.Content>
    );
}

export default Users;
