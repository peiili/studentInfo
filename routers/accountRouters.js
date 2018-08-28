const express = require("express");

const path = require("path");
const accountRouter = express.Router();
//导入控制器;
const accountCtrl = require(path.join(__dirname,"../controllers/accountCtrl.js"));
accountRouter.get("/register",accountCtrl.register);

module.exports = accountRouter;