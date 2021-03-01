import React, { useState } from 'react';
import '../../App.css';

import { Menu, Layout, PageHeader, Avatar } from 'antd';
import Ativos from './Sections/Ativos/index';
import Overview from './Sections/Overview/index';
import Companies from './Sections/Companies/index';
import Units from './Sections/Units/index';
import Users from './Sections/Users/index';


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

      case "Usuários":
        return <Users />;

      default:
        return <Overview />;

    }
  }

  return (
    <Layout className="layoutDashboard">

      <Sider breakpoint="lg" collapsedWidth="0">

        <div className="menuHeader">
          <Avatar src="https://tractian.com/wp-content/uploads/cropped-tractian-favicon-ia-32x32.png" />
          <strong className="menuHeaderTitle">Tractian</strong>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["Overview"]} onSelect={(e) => setPage(e.key.toString())}>
          <Menu.Item key="Overview" >
            Overview
            </Menu.Item>
          <Menu.Item key="Ativos" >
            Ativos
            </Menu.Item>
          <Menu.Item key="Unidades" >
            Unidades
            </Menu.Item>
          <Menu.Item key="Empresas" >
            Empresas
            </Menu.Item>
          <Menu.Item key="Usuários" >
            Usuários
            </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header className="layoutHeader">
          <PageHeader title={page} style={{ background: "#fff" }}
            extra={[
              <Avatar src="https://tractian.com/wp-content/uploads/cropped-tractian-favicon-ia-32x32.png" />
            ]}/>
        </Header>

        {switchPages(page)}

      </Layout>
    </Layout>
  );
}

export default Dashboard;
