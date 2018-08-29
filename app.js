//1.导包
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
//2.创建服务;
const app = express();

//2.1接收注册页面
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//集成路由
const accountRouter = require(path.join(__dirname,"./routers/accountRouters.js"));

//使用路由;
app.use('/account',accountRouter);

//3.开启服务
app.listen(8080,"127.0.0.1",(err)=>{
    if(err) console.log(err);
    console.log("start OK");
})