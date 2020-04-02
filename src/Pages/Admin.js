import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "../static/css/Admin.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DesktopOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { Route } from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const handleClickArticle=e=>{
    if(e.key=='addArticle'){
      props.history.push('/index/add')
    }else{
      props.history.push('/index/list')
    }
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Item key="1">
            <UserOutlined />
            <span>工作台</span>
          </Item>

          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <DesktopOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Item key="ArticleList">文章列表</Item>
            <Item key="addArticle">添加文章</Item>
          </SubMenu>
          <Item key="9">
            <UploadOutlined />
            <span>留言管理</span>
          </Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle
            }
          )}
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <div>
                <Route path="/index/" exact component={AddArticle} />
                <Route path="/index/add/" exact component={AddArticle} />
                <Route path="/index/add/:id" exact component={AddArticle} />
                <Route path="/index/list/" component={ArticleList} />
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          技术博客后台 ©2020 Created by YYWW
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
