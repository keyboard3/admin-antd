import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { menuRoutes, pageRoutes } from "./router";
import { Router, Link } from "@reach/router"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {menuRoutes.map(item => {
              if (item.subs) return (
                <SubMenu key={item.name} icon={<item.icon />} title={item.name}>
                  {item.subs.map(subItem => <Menu.Item key={subItem.name} ><Link to={subItem.path}>{subItem.name}</Link></Menu.Item>)}
                </SubMenu>
              );
              return <Menu.Item key={item.name} >{item.name}</Menu.Item>
            })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Router>
              {pageRoutes.map(Item => {
                console.log("---item.compoent", Item.name,Item.component, <Item.component path={Item.path} />)
                return <Item.component path={Item.path} />;
              })}
            </Router>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}