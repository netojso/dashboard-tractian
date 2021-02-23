import React, { useState } from 'react';
import { Avatar, Button, Card, Carousel, Col, DatePicker, Form, Input, InputNumber, Layout, Modal, Row, Select, Slider, Table, Tag, Tree, Upload } from 'antd';

import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);


import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusCircleOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

const { Header, Content, Footer, Sider } = Layout;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const options: Highcharts.Options =  {
        chart: {
          plotBackgroundColor: undefined,
          plotBorderWidth: undefined,
          plotShadow: false,
          type: 'pie'
      },
      title: {
        text: 'Saúde'
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
      },
    series: [{
      type: 'pie',
      name: 'Brands',
      colorByPoint: true,
      data: [{
          name: 'Total',
          y: 100.00,

      }, {
          name: 'Saúde',
          y: 82.00,
          selected: true
      }]
    }]
}

const options2: Highcharts.Options = {
  chart: {
      type: 'chart',
      height: '60%',
  },

  title: {
      text: 'Saúde (%)',
      style: {
          fontSize: '24px'
      }
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: 'none',
    shadow: false,
    style: {
        fontSize: '16px'
    },
    valueSuffix: '%',
    pointFormat: '<span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
    positioner: function(label) {
      return {
        x: 265,
        y: 195
      }
    }
  },
  pane: {
      startAngle: 0,
      endAngle: 360,
      background: [{ // Track for Move
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: "rgba(124, 181, 236, 0.3)",
          borderWidth: 0
      }]
  },
  yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
  },

  plotOptions: {
      solidgauge: {
          dataLabels: {
              enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true
      }
  },

  series: [{
      type: 'solidgauge',
      name: 'Move',
      data: [{
          color: '#ff0000',
          radius: '112%',
          innerRadius: '88%',
          y: 80
      }]
  }]
};

const treeDataSpecifications = [
  {
    title: 'Especificações',
    key: '4',
    children: [
      {
        title: 'parent 1-0',
        render: (text: string) => <p>{text}</p>,
        key: '1',
      },
      {
        title: 'parent 2-0',
        disabled: true,
        key: '2',
      }
    ]
  }];
const treeDataMetrics = [
  {
    title: 'Métricas',
    key: '4',
    children: [
      {
        title: 'parent 1-0',
        key: '1',
        selectable: false
      },
      {
        title: 'parent 2-0',
        disabled: true,
        key: '2',
      }
    ]
  }];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const Ativos: React.FC = () => {
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenNewItemModal, setIsOpenNewItemModal] = useState(false);

  return (
    <Content
        style={{
        background: '#fff',
          margin: '12px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Row style={{marginBottom: 10}}>
          <Col span={4} offset={21}>
          <Button
          onClick={() => setIsOpenNewItemModal(true)}
          type="primary"
          shape="circle"
          icon={<DeleteOutlined style={{fontSize: 20, color: '#fff'}} />} />

          <Button
          onClick={() => setIsOpenNewItemModal(true)}
          type="primary"
          shape="circle"
          icon={<EditOutlined style={{fontSize: 20, color: '#fff'}} />} />

          <Button
          onClick={() => setIsOpenNewItemModal(true)}
          type="primary"
          shape="circle"
          icon={<PlusCircleOutlined style={{fontSize: 20, color: '#fff'}} />} />
          </Col>
        </Row>
        <Table rowSelection={rowSelection} dataSource={data} columns={columns}
         onRow={(record, rowIndex) => {
          return {
            onClick: event => {setIsOpenDetailsModal(true)},
          };
        }} />
        <Modal
          style={{minWidth: 700, padding: "0px 40px", top: 20}}
          visible={isOpenNewItemModal}
          title="Novo item"
          onOk={() => setIsOpenNewItemModal(false)}
          onCancel={() => setIsOpenNewItemModal(false)}
          okText="Adicionar"
          cancelText="Cancelar"
        >
          <Form name="validate_other">
          <strong>Geral</strong>
            <Row gutter={24} >
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="slider" label="Saúde">
                  <Slider />
                </Form.Item>   
              </Col>
              <Col span={12}>
              <Form.Item
                name="select"
                label="Status">
                  <Select defaultValue="inAlert" onChange={(e) => console.log(e)}>
                    <Select.Option value="inAlert">Em alerta</Select.Option>
                    <Select.Option value="inOperation">Em operação</Select.Option>
                    <Select.Option value="inDowntime">Em parada</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                name="select-multiple"
                label="Sensores"
                rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
                >
                  <Select mode="multiple" placeholder="Please select favourite colors">
                    <Select.Option value="red">Red</Select.Option>
                    <Select.Option value="green">Green</Select.Option>
                    <Select.Option value="blue">Blue</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item
                name="select"
                label="Status">
                  <Select defaultValue="inAlert" onChange={(e) => console.log(e)}>
                    <Select.Option value="inAlert">Em alerta</Select.Option>
                    <Select.Option value="inOperation">Em operação</Select.Option>
                    <Select.Option value="inDowntime">Em parada</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item
                name="select"
                label="Status">
                  <Select defaultValue="inAlert" onChange={(e) => console.log(e)}>
                    <Select.Option value="inAlert">Em alerta</Select.Option>
                    <Select.Option value="inOperation">Em operação</Select.Option>
                    <Select.Option value="inDowntime">Em parada</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <strong>Especificações</strong>
            <Row gutter={24} title="Especificações" style={{marginTop: 20, fontSize: 40, color: "#000"}}>
              <Col span={8}>
                <Form.Item
                  name="maxTemp"
                  label="Temp. Máx. (ºC)">
                    <InputNumber min={0} step={0.1} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="power"
                  label="Potência (kWh)">
                    <InputNumber min={0} step={0.1} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="rpm"
                  label="RPM">
                  <InputNumber min={0} />
                </Form.Item>
              </Col>
            </Row>

            <strong>Métricas</strong>
            <Row gutter={24} title="Métricas">
              <Col span={8}>
                <Form.Item
                  name="totalCollectsUptime"
                  label="Total de Coletas">
                    <InputNumber min={0} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="totalUptime"
                  label="Total de Horas (h)">
                    <InputNumber min={0} step={0.1} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="lastUptimeAt"
                  label="Data da Última Coleta">
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
            
            
          </Form>    
        </Modal>


         <Modal
          width="80%"
          visible={isOpenDetailsModal}
          centered
          title="Informações"
          onOk={() => setIsOpenDetailsModal(false)}
          onCancel={() => setIsOpenDetailsModal(false)}
          footer={[
            <div/>,
            <div/>,
          ]}
        >
          <Row>
            <Col span={14}>
            <Carousel autoplay>
              <HighchartsReact
                  highcharts={Highcharts}
                  options={options2}
              />
              <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
              />
            </Carousel>

            </Col>
            <Col span={8} title="Últimos ativos" style={{marginLeft: 40}}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <EditOutlined key="edit" />,
              ]}
            >
              <Meta
                title={[
                  <strong>Motor ED-4f</strong>,
                  <Tag color="red" style={{marginLeft: 80}}>Em alerta</Tag>
                ]}
                description={
                  [
                    <p><strong>Saúde:</strong> 90%</p>,
                    <Tree
                      focusable={false}
                      selectable={false}
                      draggable={false}
                      style={{background:'#fff'}}
                      onSelect={(i) => console.log(i) }
                      treeData={treeDataSpecifications}
                  />,
                  <Tree
                      focusable={false}
                      selectable={false}
                      draggable={false}
                      style={{background:'#fff', display: 'block'}}
                      onSelect={(i) => console.log(i) }
                      treeData={treeDataMetrics}
              />,
                  ]
                }
              />
            </Card>
            </Col>
          </Row>
        </Modal>
    </Content>
  );
}

export default Ativos;
