import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Modal, Tag, message } from "antd";
import axios from "axios";
import servicePath from "./../config/apiUrl";
import moment from 'moment'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Item from "antd/lib/list/Item";

const ArticleList = props => {
  const [artList, setArtList] = useState([]);

  useEffect(()=>{
    getArticleList()
  },[])

  const getArticleList=()=>{
    axios({
      method:'get',
      url:servicePath.getArticleList,
      withCredentials:true,
      header:{ 'Access-Control-Allow-Origin':'*' }
  }).then(res=>{
      setArtList(res.data.list)
  })
  }
  const changeArticle = (id) => {
    props.history.push('/index/add/'+id)
  };

  const deletArticle = (id) => {
   Modal.confirm({
      title:'删除警告',
      icon:<ExclamationCircleOutlined />,
      content:'是否删除所选项目',
      okText: '确认',
      cancelText: '取消',
      onOk:function () {
        axios({
          method:'get',
          url:servicePath.delArticle+id,
          withCredentials:true
        }).then(res=>{
          if (res.status===200) {
            message.success('删除成功')
            getArticleList()
          }
        }).catch(err=>{
          console.log(err.message)
        })
      }
   })

  };

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
          <a onClick={()=>{changeArticle(record.id)}} style={{marginRight:'20px'}}>修改</a>
          <a  onClick={()=>{deletArticle(record.id)}}>删除</a>
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
