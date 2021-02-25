import React, { useEffect, useState } from 'react';
import "./styles.css";

import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import {Layout , Row, Col, Card, Tag, Skeleton} from 'antd';

import api from '../../../../services/api';
import { Asset } from '../../../../@types/asset';
import { Unit } from '../../../../@types/unit';
import { Company } from '../../../../@types/company';
import { User } from '../../../../@types/user';
import InfoCard from './components/InfoCard';


let optionModel: Highcharts.Options = {
    title: {
        text: 'Histórico de Saúde dos ativos'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Saúde (%)'
        }
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
    },

    series: [{
        type: 'column',
        name: 'Saúde',
        data: [
            ['Shanghai', 24.2],
            ['Beijing', 20.8],
            ['Karachi', 14.9],
            ['Shenzhen', 13.7],
            ['Guangzhou', 13.1],
            ['Istanbul', 12.7],
            ['Mumbai', 12.4],
            ['Moscow', 12.2],
            ['São Paulo', 12.0],
            ['Delhi', 11.7],
            ['Kinshasa', 11.5],
            ['Tianjin', 11.2],
            ['Lahore', 11.1],
            ['Jakarta', 10.6],
            ['Dongguan', 10.6],
            ['Lagos', 10.6],
            ['Bengaluru', 10.3],
            ['Seoul', 9.8],
            ['Foshan', 9.3],
            ['Tokyo', 9.3]
        ]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
}
const Overview: React.FC = () => {
const [loading, setLoading] = useState(true);
const [assets, setAssets] = useState<Asset[]>();
const [units, setUnits] = useState<Unit[]>();
const [companies, setCompanies] = useState<Company[]>();
const [users, setUsers] = useState<User[]>();

const [options, setOptions] = useState<Highcharts.Options>({});

useEffect(() => {
    async function loadData() {
        const {data: assetsData} = await api.get<Asset[]>('/assets');
        const {data: unitsData} = await api.get<Unit[]>('/units');
        const {data: companiesData} = await api.get<Company[]>('/companies');
        const {data: usersData} = await api.get<User[]>('/users');

        Object.assign(optionModel, {
         series: [{
             type: 'column',
             name: 'Heathly',
             data:  assetsData
                    .slice(Math.max(assetsData.length - 8, 0))
                    .map(asset => [asset.name, asset.healthscore] )
         }]
        })

        setOptions(optionModel);

        setAssets(assetsData);
        setUnits(unitsData);
        setCompanies(companiesData);
        setUsers(usersData);

        setLoading(false);
    }

    loadData();
}, [])
    
  return (
    <>
    <Layout.Content style={{ margin: '24px 16px 0', maxHeight: 150 }}>
        <Row gutter={40} style={{textAlign: 'center'}}>
           <InfoCard title="Ativos" quantity={assets?.length} loading={loading} />
           <InfoCard title="Unidades" quantity={units?.length} loading={loading} />
           <InfoCard title="Empresas" quantity={companies?.length} loading={loading} />
           <InfoCard title="Usuários" quantity={users?.length} loading={loading} />
        </Row>
        </Layout.Content>
        <Layout.Content
          style={{ background: '#fff', margin: '12px 16px', padding: 24,minHeight: 280}}>
          <Row>
            <Col span={18}>
              <Skeleton className="skeleton-chart" active loading={loading} paragraph={{rows: 6}}/>
              {!loading && (
                  <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                  />
              )}               
            </Col>
                <Col span={6} title="Últimos ativos">
                  <p style={{padding: '4px 20px', fontSize: 18}}>Últimos ativos</p>
                  <div  style={{overflow: 'auto', height: 400, marginTop: 10, marginLeft: 10}}>
                    {assets?.map(asset => (
                        <Card key={asset.id} title={asset.name} bordered={false} style={{borderLeft: '1px solid #DFE0EB'}} >
                        <p><strong>Sáude:</strong> {asset.healthscore}
                        <Tag color="red" style={{marginLeft: 20}}>{asset.status}</Tag>
                        </p>
                        <p><strong>Empresa: </strong> Tractian</p>
                        <p><strong>Unidade: </strong> Jaguar</p>
                      </Card>
                    ))}
                  </div>

                </Col>
            </Row>
    </Layout.Content>
    </>
  );
}

export default Overview;
