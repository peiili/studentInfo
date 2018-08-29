//1.导包
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
//2.创建服务;
const app = express();

//2.1接收页面post请求,app中使用了body的方法;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//session中间件;
app.use(session({ secret: 'keyboard cat',resave:false,//添加这行
saveUninitialized: true, cookie: { maxAge: 60000 }}))
//集成路由
const accountRouter = require(path.join(__dirname,"./routers/accountRouters.js"));
const studentInfo = require(path.join(__dirname,"./routers/infoRouters.js"));

//使用路由;
app.use('/account',accountRouter);
app.use('/info',studentInfo);

//3.开启服务
app.listen(8080,"127.0.0.1",(err)=>{
    if(err) console.log(err);
    console.log("start OK");
})