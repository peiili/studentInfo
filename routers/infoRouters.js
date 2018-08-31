//创建路由;
const express = require("express");
const infoRouter = express.Router();
const path = require("path");
//导入中间件;
const studentinfoCtrl = require(path.join(__dirname,"../controllers/studentinfoCtrl.js"));
infoRouter.get('/studentinfo',studentinfoCtrl.studentInfopage);
infoRouter.get('/addstudentinfo',studentinfoCtrl.addStudent);
infoRouter.post('/addsaveInfo',studentinfoCtrl.insertData);
//动态添加参数.在路径后面添加  " : "和参数的名;
infoRouter.get('/editstudentInfo/:studentId',studentinfoCtrl.editstudentInfo);

//将各种方法暴露出去;
module.exports = infoRouter;
