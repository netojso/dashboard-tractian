import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Table, Tag } from 'antd';
import './styles.css';

import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";

highchartsMore(Highcharts);
solidGauge(Highcharts);

import TableOptions from '../../components/TableOptions';
import InfoModal from './components/InfoModal';
import NewItemModal from './components/NewItemModal';
import { Asset } from '../../../../@types/asset';
import { Company } from '../../../../@types/company';
import { Unit } from '../../../../@types/unit';
import api from '../../../../services/api';
import { SyncOutlined } from '@ant-design/icons';
import translateStatus from '../../../../utils/translateStatus';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[]) => {console.log(selectedRowKeys)},
};

const Ativos: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedAssetKey, setSelectedAssetKey] = useState(0);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openNewItemModal, setOpenNewItemModal] = useState(false);

  const [assets, setAssets] = useState<Asset[]>();
  const [units, setUnits] = useState<Unit[]>();
  const [companies, setCompanies] = useState<Company[]>();
  const [tableData, setTableData] = useState<any>();

  const selectCompanies = useMemo(() => {
    return companies?.map(company => {
      return {
        value: company.id,
        display: company.name
      }
    })
  }, [companies])

  const selectUnits = useMemo(() => {
    return units?.map(unit => {
      return {
        value: unit.id,
        display: unit.name
      }
    })
  }, [units])

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Model',
      dataIndex: 'model',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: string) => (
      <Tag color={translateStatus(text)?.color}>{
        translateStatus(text)?.status}</Tag>)
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
      const {data: assetsData} = await api.get<Asset[]>('/assets');
      const {data: companiesData} = await api.get<Company[]>('/companies');
      const {data: unitsData} = await api.get<Unit[]>('/units');

      const data = assetsData?.map(asset => {
        return {
          key: asset.id,
          name: asset.name,
          model: asset.model,
          status: asset.status,
          unit: unitsData?.find(u => u.id === asset.unitId)?.name,
          company: companiesData?.find(c => c.id === asset.companyId)?.name
        }
      })



      if(data !== undefined) setTableData(data);

      setAssets(assetsData);
      setUnits(unitsData);
      setCompanies(companiesData);

      setLoading(false);
    }

    loadData();
}, [])

  return (
    <Layout.Content
      style={{
        background: '#fff',
        margin: '20px 16px',
        padding: 24,
        minHeight: 280,
        position: 'relative'
      }}>
        <TableOptions openModal={setOpenNewItemModal} />

        {!loading ? (
          <Table
            rowSelection={rowSelection}
            dataSource={tableData}
            columns={columns}
            onRow={(record) => {
            return {
              onClick: () => {
                setSelectedAssetKey(record.key);
                setOpenInfoModal(true)},
            };
          }}/>
        ): (
          <SyncOutlined className='spinLoading' spin />
        )}

        <InfoModal
          openInfoModal={openInfoModal}
          toggleModal={setOpenInfoModal}
          asset={assets?.find(a => a.id === selectedAssetKey)}/>

        <NewItemModal
          selectCompanies={selectCompanies}
          selectUnits={selectUnits}
          openNewItemModal={openNewItemModal}
          toggleModal={setOpenNewItemModal}/>

    </Layout.Content>
  );
}

export default Ativos;
