import React from 'react';
import "./styles.css";

import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import {Menu, Layout , PageHeader, Row, Col, Avatar, Card, Statistic, Divider, Tag} from 'antd';
import { ArrowUpOutlined, SearchOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const options: Highcharts.Options = {
    title: {
        text: 'Histórico de Saúde dos ativos'
    },
    yAxis: {
        title: {
            text: 'Saúde (%)'
        }
    },
    xAxis: {
        categories: [
            "Janeiro","Fevereiro", "Março","Abril","Maio",
            "Junho","Julho","Agosto","Setembro","Outubro",
            "Novembro","Dezembro"
        ]
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
        type: 'line',
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        type: 'line',
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        type: 'line',
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        type: 'line',
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        type: 'line',
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
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
  return (
    <>
    <Content style={{ margin: '24px 16px 0', maxHeight: 150 }}>
        <Row gutter={40} style={{textAlign: 'center'}}>
            <Col span={6}>
                <Card className="card">
                    <strong className="cardTitle">Ativos</strong>
                    <p className="cardText">6</p>
                </Card>
            </Col>
            <Col span={6}>
                <Card className="card">
                    <strong className="cardTitle">Ativos</strong>
                    <p className="cardText">6</p>
                </Card>
            </Col>
            <Col span={6}>
                <Card className="card">
                    <strong className="cardTitle">Ativos</strong>
                    <p className="cardText">6</p>
                </Card>
            </Col>
            <Col span={6}>
                <Card className="card">
                    <strong className="cardTitle">Ativos</strong>
                    <p className="cardText">6</p>
                </Card>
            </Col>
         </Row>
        </Content>
        <Content
            style={{
            background: '#fff',
              margin: '12px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
             <Row>
                <Col span={18}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
                </Col>
                <Col span={6} title="Últimos ativos">
                  <p style={{padding: '4px 20px', fontSize: 18}}>Últimos ativos</p>
                  <div  style={{overflow: 'auto', height: 400, marginTop: 10, marginLeft: 15}}>
                    <Card title="Motor ED-4F" bordered={false} style={{borderLeft: '1px solid #DFE0EB'}} >
                      <p><strong>Sáude:</strong> 90%
                      <Tag color="red" style={{marginLeft: 55}}>Em alerta</Tag>
                      </p>
                      <p><strong>Empresa: </strong> Tractian</p>
                      <p><strong>Unidade: </strong> Jaguar</p>
                    </Card>
                    <Card title="Card title" bordered={false} style={{borderLeft: '1px solid #DFE0EB'}} >
                    <p><strong>Sáude:</strong> 90%
                      <Tag color="red" style={{marginLeft: 50}}>Em alerta</Tag>
                      </p>
                      <p><strong>Empresa: </strong> Tractian</p>
                      <p><strong>Unidade: </strong> Jaguar</p>
                    </Card>
                    <Card title="Card title" bordered={false} style={{borderLeft: '1px solid #DFE0EB'}} >
                    <p><strong>Sáude:</strong> 90%
                      <Tag color="red" style={{marginLeft: 50}}>Em alerta</Tag>
                      </p>
                      <p><strong>Empresa: </strong> Tractian</p>
                      <p><strong>Unidade: </strong> Jaguar</p>
                    </Card>
                  </div>

                </Col>
            </Row>
    </Content>
    </>
  );
}

export default Overview;
