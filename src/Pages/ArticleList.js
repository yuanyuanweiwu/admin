import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Modal, Tag } from "antd";
import axios from "axios";
import servicePath from "./../config/apiUrl";
import moment from 'moment'

const ArticleList = props => {
  const [artList, setArtList] = useState([]);

  useEffect(()=>{
      axios({
          method:'get',
          url:servicePath.getArticleList,
          withCredentials:true,
          header:{ 'Access-Control-Allow-Origin':'*' }
      }).then(res=>{
          setArtList(res.data.list)
      })
  },[])


  const changeArticle = () => {};

  const deletArticle = () => {};

  const handleTag = text => {
    switch (text) {
      case 1:
        return <Tag color="geekblue">{'生活'}</Tag>;
      case 2:
        return <Tag color="green">{'摄影'}</Tag>;
      case 3:
        return <Tag color="volcano">{'美食'}</Tag>;
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
      render: text => <span>{moment(Number(text)).format('YYYY-MM-DD')}</span>
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
          <a onClick={changeArticle} style={{marginRight:'20px'}}>修改</a>
          <a onClick={deletArticle}>删除</a>
        </span>
      )
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={artList}  rowKey={record => record.id} />
    </div>
  );
};

export default ArticleList;
