import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Input, Button, Spin, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "../static/css/Login.css";
import axios from "axios";
import servicePath from "./../config/apiUrl";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const checkLogin = () => {
    setIsLoading(true);
    if (!userName) {
      message.error("用户名不能为空");
    } else if (!password) {
      message.error("密码不能为空");
    }else{
      let data = {
        userName: userName,
        password: password
      };
      axios({
        method: "post",
        url: servicePath.checkLogin,
        data: data,
        withCredentials: true
      }).then(res => {
        setIsLoading(false);
        if (res.data.data === "success") {
          localStorage.setItem("openId", res.data.openId);
          props.history.push("/index");
        } else {
          message.error("用户密码错误");
        }
      });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title="YYWW Blog  System"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={e => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            登陆
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
