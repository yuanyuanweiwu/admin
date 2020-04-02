import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import { Button, Row, Col, Select, Input, DatePicker,message } from "antd";

import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import servicePath from "./../config/apiUrl";
import  axios  from "axios";

const { Option } = Select;
const { TextArea } = Input;
const AddArticle = props => {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState('请选择类型'); //选择的文章类别

  useEffect(() => {
    getTypeInfo();

  }, []);

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
  });
  //及时同步内容
  const changeContent = e => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };
 //及时同步简介
  const changeIntroduce = e => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };
  //根据权限获取类别
  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true
    }).then(res => {
      if (res.data.data == "failed") {
        // localStorage.removeItem("openId");
        // props.history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };
  const changeType=value=>{
    setSelectType(value)
  }

  //保存文章
  const saveArticle = ()=>{ 
  
    if(selectedType==='请选择类型'){
        message.error('必须选择文章类别')
        return false
    }else if(!articleTitle){
        message.error('文章名称不能为空')
        return false
    }else if(!articleContent){
        message.error('文章内容不能为空')
        return false
    }else if(!introducemd){
        message.error('简介不能为空')
        return false
    }else if(!showDate){
        message.error('发布日期不能为空')
        return false
    }

    let dataProps={
      type_id:Number(selectedType),
      title:articleTitle,
      article_content:articleContent,
      introduce:introducemd,
      addTime:String(Date.parse(new Date(showDate.replace(/-/g, "/")))),
    }
    if (articleId===0) {
      dataProps.view_count=Math.ceil(Math.random()*100)
      axios({
        method:'post',
        url:servicePath.addArticle,
        headers:{'Access-Control-Allow-Origin':'*'},
        withCredentials:true,
        data:dataProps
      }).then(res=>{
        setArticleId(res.data.insertId)
        if (res.data.isSuccess) {
          message.success('文章发布成功')
        }else{
          message.success('文章发布失败')
        }
      })
    } else {
      dataProps.id=articleId
      axios({
        method:'post',
        url:servicePath.updateArticle,
        headers:{'Access-Control-Allow-Origin':'*'},
        withCredentials:true,
        data:dataProps
      }).then(res=>{
        if (res.data.isSuccess) {
          message.success('文章保存成功')
        } else {
          message.error('文章保存失败')
        }
      })
    }
}

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input placeholder="博客标题" size="large" onChange={e=>setArticleTitle(e.target.value)} />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={changeType}>
               {
                 typeInfo&&typeInfo.map((item,index)=>{
                   return (
                     <Option key={index} value={item.id}>{item.typeName}</Option>
                   )
                 })
               }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介"
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: "文章简介：" + introducehtml
                }}
              ></div>
            </Col>

            <Col span={12}>
              <div className="date-select">
                <DatePicker locale={locale} placeholder="发布日期" size="large" onChange={(date,dateString)=>{
                  setShowDate(dateString)
                  
                }}/>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddArticle;
