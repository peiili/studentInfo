const express = require("express");
const path = require("path");
const accountRouter = express.Router();
//导入控制器;
const accountCtrl = require(path.join(__dirname,"../controllers/accountCtrl.js"));
//注册页面请求信息;
accountRouter.get("/registerpage",accountCtrl.registerpage);
//登陆页面请求
accountRouter.get("/loginpage",accountCtrl.loginpage);
//获取验证码请求
accountRouter.get("/vcode",accountCtrl.vcode);
//用户注册信息;
accountRouter.post("/register",accountCtrl.register);
//用户登陆信息;
accountRouter.post("/login",accountCtrl.login);


module.exports = accountRouter;