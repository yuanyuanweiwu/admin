import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Modal, Tag } from "antd";
import axios from "axios";
import servicePath from "./../config/apiUrl";

const ArticleList = props => {
  const [artList, setArtList] = useState([]);

  const format = fmt => {
    var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      S: this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, this.getFullYear() + "");
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  };

  const changeArticle = () => {};

  const deletArticle = () => {};

  const handleTag = text => {
    switch (text) {
      case 1:
        return <Tag color="geekblue">{text}</Tag>;
      case 2:
        return <Tag color="green">{text}</Tag>;
      case 3:
        return <Tag color="volcano">{text}</Tag>;
    }
  };
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "简介",
      dataIndex: "introduce",
      key: "introduce"
    },
    {
      title: "发布时间",
      dataIndex: "addTime",
      key: "addTime",
      render: text => <span>{format(text)}</span>
    },
    {
      title: "类型",
      key: "type_id",
      dataIndex: "type_id",
      render: text => <span>{handleTag(text)}</span>
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a onClick={changeArticle}>修改</a>
          <a onClick={deletArticle}>删除</a>
        </span>
      )
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={artList} />
    </div>
  );
};

export default ArticleList;
