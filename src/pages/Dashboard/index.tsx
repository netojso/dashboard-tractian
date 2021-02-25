import React, { useEffect, useState } from 'react';

import { Menu, Layout, PageHeader, Avatar } from 'antd';
import { SearchOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Ativos from './sections/Ativos';
import Overview from './sections/Overview';
import Companies from './sections/Companies';
import Units from './sections/Units';


const { Header, Sider } = Layout;

const Dashboard: React.FC = () => {
  const [page, setPage] = useState("Overview");


  function switchPages(name: any) {
    switch (name) {
      case "Overview":
        return <Overview />;

      case "Ativos":
        return <Ativos />;

      case "Empresas":
        return <Companies />;

      case "Unidades":
        return <Units />;

      default:
        return <Overview />;

    }
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Sider breakpoint="lg" collapsedWidth="0">

        <div style={{ width: 256, padding: "10px 20px" }}>
          <Avatar src="https://tractian.com/wp-content/uploads/cropped-tractian-favicon-ia-32x32.png" />
          <strong style={{ marginLeft: 10, color: '#fff', letterSpacing: 1, fontSize: 18, fontWeight: 400 }}>Tractian</strong>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["Overview"]} onSelect={(e) => setPage(e.key.toString())}>
          <Menu.Item key="Overview" icon={<UserOutlined />} >
            Overview
            </Menu.Item>
          <Menu.Item key="Ativos" icon={<VideoCameraOutlined />} >
            Ativos
            </Menu.Item>
          <Menu.Item key="Unidades" icon={<UploadOutlined />}>
            Unidades
            </Menu.Item>
          <Menu.Item key="Empresas" icon={<UserOutlined />} >
            Empresas
            </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: "#fff" }}>
          <PageHeader title={page} style={{ background: "#fff" }}
            extra={[
              <SearchOutlined />,
              <Avatar src="https://tractian.com/wp-content/uploads/cropped-tractian-favicon-ia-32x32.png" />
            ]}/>
        </Header>

        {switchPages(page)}   

      </Layout>
    </Layout>
  );
}

export default Dashboard;
