import React from 'react';

import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import {Menu, Layout , PageHeader, Row, Col, Avatar, Card, Statistic, Divider} from 'antd';
import { ArrowUpOutlined, SearchOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const options: Highcharts.Options = {
  chart: {
    type: 'areaspline',
},
title: {
    text: 'Average fruit consumption during one week',
},
legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 150,
    y: 100,
    floating: true,
    borderWidth: 1,
    backgroundColor:
        Highcharts.defaultOptions.legend?.backgroundColor || '#FFFFFF',
},
xAxis: {
    categories: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ],
    plotBands: [{ // visualize the weekend
        from: 4.5,
        to: 6.5,
        color: 'rgba(68, 170, 213, .2)',
    }]
    },
    yAxis: {
        title: {
            text: 'Fruit units',
        },
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units',
    },
    credits: {
        enabled: false,
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5,
        }
    },
    series: [{
        type: 'line',
        name: 'John',
        data: [3, 4, 3, 5, 4, 10, 12],
    }, {
        type: 'line',
        name: 'Jane',
        data: [1, 3, 4, 3, 3, 5, 4],
    }]
}

const Overview: React.FC = () => {
  return (
    <>
    <Content style={{ margin: '24px 16px 0', maxHeight: 150 }}>
        <Row gutter={8}>
             <Col className="gutter-row" span={6}>
             <Card>
                <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
                </Card>
             </Col>
             <Col className="gutter-row" span={6}>
             <Card>
                <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
                </Card>
             </Col>
             <Col className="gutter-row" span={6}>
             <Card hoverable>
                <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
                </Card>
             </Col>
             <Col className="gutter-row" span={6}>
             <Card>
                <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
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
                  <strong style={{padding: '8px 16px'}}>Últimos ativos</strong>
                  <div  style={{overflow: 'auto', height: 400, marginTop: 10}}>
                    <Card title="Card title" bordered={false} >
                      <p>Card content</p>
                      <p>Card content</p>
                      <p>Card content</p>
                    </Card>
                    <Card title="Card title" bordered={false} >
                      <p>Card content</p>
                      <p>Card content</p>
                      <p>Card content</p>
                    </Card>
                    <Card title="Card title" bordered={false} >
                      <p>Card content</p>
                      <p>Card content</p>
                      <p>Card content</p>
                    </Card>
                  </div>

                </Col>
            </Row>
    </Content>
    </>
  );
}

export default Overview;
