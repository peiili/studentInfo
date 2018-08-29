//创建路由;
const express = require("express");
const infoRouter = express.Router();
const path = require("path");
//导入中间件;
const studentinfoCtrl = require(path.join(__dirname,"../controllers/studentinfoCtrl.js"));
infoRouter.get('/studentinfo',studentinfoCtrl.studentInfopage);





module.exports = infoRouter;