import React, { ReactElement, useState } from 'react';
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import {Menu, Layout , PageHeader, Row, Col, Avatar, Card, Statistic, Divider} from 'antd';
import { ArrowUpOutlined, SearchOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import switchPages from '../../utils/switchPage';
import Ativos from './sections/Ativos';
import Overview from './sections/Overview';

const { Header, Content, Footer, Sider } = Layout;




const Dashboard: React.FC = () => {

  const [page, setPage] = useState("Overview");

  function switchPages(name: any) {
    switch (name) {
      case "Overview":
        return <Overview />;
        break;
      case "Ativos":
        return <Ativos />;
        break;
      case "Empresas":
        return <Overview />;
        break;

      default:
        return <Overview />;
        break;
    }}


  return (
    <Layout style={{minHeight: '100vh'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div style={{width: 256, padding: "10px 20px" }}>
          <Avatar src="https://tractian.com/wp-content/uploads/cropped-tractian-favicon-ia-32x32.png" />
        <strong style={{marginLeft: 10}}>Tractian</strong></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['Overview']} onSelect={(e) => {setPage(e.key.toString())} }>
            <Menu.Item key="Overview" icon={<UserOutlined />} >
            Overview
            </Menu.Item>
            <Menu.Item key="Ativos" icon={<VideoCameraOutlined />} >
            Ativos
            </Menu.Item>
            <Menu.Item key="Units" icon={<UploadOutlined />}>
            Unidades
            </Menu.Item>
            <Menu.Item key="Companies" icon={<UserOutlined />} >
            Empresas
            </Menu.Item>
        </Menu>
        </Sider>
        <Layout>
          <Header title={page} style={{ padding: 0, background: "#fff" }}>
          <PageHeader
              title="Overview"
              style={{background: "#fff"}}
              extra={[
                  <SearchOutlined />,
                  <Avatar src="https://tractian.com/wp-content/uploads/cropped-tractian-favicon-ia-32x32.png" />
              ]}
          />
        </Header>
          {switchPages(page)}
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
    </Layout>
//     <Layout
//         style={{ minHeight: '100vh'}}>

//     <Layout.Sider width={256}>
//         <Menu
//             onClick={() => console.log("OI")}
//             style={{ width: 256 }}
//             defaultSelectedKeys={['1']}
//             mode="inline"
//             theme="dark"
//         >
//             <div style={{width: 256, padding: "10 20" }}>
//             <Avatar src="https://tractian.com/wp-content/uploads/cropped-tractian-favicon-ia-32x32.png" />
//             <strong style={{marginLeft: 10}}>Tractian</strong></div>
//             <Menu.Item key="1">Option 1</Menu.Item>
//             <Menu.Item key="2">Option 2</Menu.Item>
//             <Menu.Item key="3">Option 3</Menu.Item>
//             <Menu.Item key="4">Option 4</Menu.Item>
//         </Menu>
//     </Layout.Sider>
//     <Layout>
//       <Layout.Header>
//         <PageHeader
//             className="site-page-header"
//             title="Overview"
//             style={{background: "#fff"}}
//             extra={[
//                 <SearchOutlined />,
//                 <Avatar src="https://tractian.com/wp-content/uploads/cropped-tractian-favicon-ia-32x32.png" />
//             ]}
//             />
//         </Layout.Header>
//       <Layout.Content>
//         <Row gutter={8}>
//             <Col className="gutter-row" span={6}>
//                 <div style={{padding: 10, background: '#737373'}}>col-6</div>
//             </Col>
//             <Col className="gutter-row" span={6}>
//                 <div style={{padding: 10, background: '#737373'}}>col-6</div>
//             </Col>
//             <Col className="gutter-row" span={6}>
//                 <div style={{padding: 10, background: '#737373'}}>col-6</div>
//             </Col>
//             <Col className="gutter-row" span={6}>
//                 <div style={{padding: 10, background: '#737373'}}>col-6</div>
//             </Col>
//         </Row>
//       </Layout.Content>
//       <Layout.Footer>Footer</Layout.Footer>
//     </Layout>
//   </Layout>
  );
}

export default Dashboard;
