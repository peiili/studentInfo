const path = require("path");
//引入验证码生成器;
const captchapng = require('captchapng');
//调用工具;
const databasetools = require(path.join(__dirname,"../tools/databasetools.js"));

//获取注册页面信息;
exports.registerpage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/register.html"));
};

//获取登陆页面信息;
exports.loginpage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/login.html"));
};

//获取验证码请求;
exports.vcode = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    req.session.vcode = vcode;
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
};

//获取注册信息;
exports.register = (req, res) => {
    //创建初始返回状态;
    //console.log(req.body);
    const result = {status: 0,message: "注册成功"};
    //去数据库查询用户输入的信息是否存在,如果存在就发返回中心注册的嘻嘻,
    //如果没注册则将信息存入数据库;
    // Use connect method to connect to the server

    databasetools.findData({username:req.body.username,password:req.body.password},"accountInfo",(err,doc)=>{
           if (doc) {
               //用户名存在,更改返回状态
               result.status = 1;
               result.message = "用户名已存在";
               res.json(result);
           } else {
               //用户名不存在,将注册信息存入数据库
               databasetools.insertData({username:req.body.username,password:req.body.password},"accountInfo",(err,result2)=>{
                   if (result2 == null) {
                       client.status = 2;
                       result.message = "注册失败";
                   }
                   res.json(result);
               })
           }
           })
         
};

//获取管理员登陆信息;
exports.login = (req, res) => {
    //设置初始状态;
    const result = {status: 0,message: "登陆成功",checkLogin:1};
    //链接数据库,将传进来的验证码和账户信息,与数据可进行对比,如果数据库中含有对应的信息则返回登陆成功;
    //1.验证验证码
    if (req.body.vcode != req.session.vcode) {
        result.status = 1;
        result.message = "验证码输入错误";
        res.json(result);
        return;
    } else {       
        databasetools.findData({
            username: req.body.username,
            password: req.body.password
        }, "accountInfo", (err, docs) => {
            if (docs==null) {
                result.status = 2;
                result.message = "账号或密码错误";
                result.checkLogin = 0;
                res.json(result);
            } else {
                res.json(result);
            }
        })
    }
};

//验证是否登陆
// exports.checkLogin = (req,res)=>{
// console.log(req.session.vode);

//     res.send(req.session.checkLogin)
// }