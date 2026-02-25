import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKey = location.pathname;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 18,
            color: "white",
          }}
        >
          <BankOutlined style={{ marginRight: 8 }} />
          {!collapsed && "Sistema Bancario"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: "/clients",
              icon: <UserOutlined />,
              label: <Link to="/clients">Clientes</Link>,
            },
            {
              key: "/solicitudes",
              icon: <FileTextOutlined />,
              label: <Link to="/solicitudes">Solicitudes</Link>,
            },
            {
              key: "/prestamos",
              icon: <DollarOutlined />,
              label: <Link to="/prestamos">Préstamos</Link>,
            },
          ]}
        />
      </Sider>

      {/* CONTENIDO */}
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            paddingLeft: 24,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Gestión de Préstamos Bancarios
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;