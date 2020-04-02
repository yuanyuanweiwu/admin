let ipUrl = 'http://127.0.0.1:7001/admin/' 

let servicePath = {
    checkLogin:ipUrl + 'checkLogin' , 
    getTypeInfo:ipUrl+'getTypeInfo',
    addArticle:ipUrl+'addArticle'
}
export default servicePath;