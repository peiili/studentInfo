const path = require("path");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//引入验证码生成器;
const captchapng = require('captchapng');
//引入post请求方法;
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//链接数据库
const url = 'mongodb://localhost:27017';
// 数据库名称;
const dbName = 'szhmqd21';


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
    var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
};

//获取注册信息;
exports.register = (req, res) => {
    //创建返回状态
    const result = {
        status: 0,
        message: "注册成功"
    };
    //去数据库查询用户输入的信息是否存在,如果存在就发返回中心注册的嘻嘻,
    //如果没注册则将信息存入数据库;
    // Use connect method to connect to the server
    MongoClient.connect(url, {
            userNewUrlParser: true
        },
        function (err, client) {
            //拿到数据库db对象    
            const db = client.db(dbName);
            //拿到集合
            const colleation = db.collection("accounInfo");
            //先根据用户名进行查询;
            colleation.findOne({
                username: req.body.username
            }, (err, doc) => {
                if (doc) {
                    //用户名存在
                    client.close();
                    //更改返回状态
                    result.status = 1;
                    result.message = "用户名已存在";
                    res.join(result);
                } else {
                    //用户名不存在,将注册信息存入数据库
                    colleation.insertOne(req.body, (err, result2) => {
                        client.close();
                        if (result2 == null) {
                            client.status = 2;
                            result.message = "注册失败";
                        }
                        res.join(result);

                    })
                }
            })
        });
};