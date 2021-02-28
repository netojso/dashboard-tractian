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

const Units: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<{value: number, display: string}[]>([]);
  const [selectedTableRows, setSelectedTableRows] = useState<React.Key[]>([]);

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
      title: 'Empresa',
      dataIndex: 'company',
    },
    {
      title: 'Ativos',
      dataIndex: 'assets',
    },

  ];


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

    <NewItemModal selectCompanies={companies} openNewItemModal={openNewItemModal} toggleModal={setOpenNewItemModal} />

  </Layout.Content>
    );
}

export default Units;
