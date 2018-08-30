const path = require("path");
//链接数据库
const MongoClient = require('mongodb').MongoClient;

//引入验证码生成器;
const captchapng = require('captchapng');
//引入post请求方法;

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
    const vcode = parseInt(Math.random()*9000+1000);
    req.session.vcode = vcode;
    var p = new captchapng(80,30,vcode); // width,height,numeric captcha
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
    //创建初始返回状态;
    //console.log(req.body);
    
    const result = {status: 0,message: "注册成功"};
    //去数据库查询用户输入的信息是否存在,如果存在就发返回中心注册的嘻嘻,
    //如果没注册则将信息存入数据库;
    // Use connect method to connect to the server
     MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
             //拿到数据库db对象    
             const db = client.db(dbName);
            //拿到集合/数据库列表
            const colleation = db.collection("accountInfo");
            //先根据用户名进行查询;
            colleation.findOne({username:req.body.username}, (err, doc) => {
                if (doc) {
                    //用户名存在
                    client.close();
                    //更改返回状态
                    result.status = 1;
                    result.message = "用户名已存在";
                    res.json(result);
                } else {
                    //用户名不存在,将注册信息存入数据库
                    colleation.insertOne(req.body, (err, result2) => {
                        client.close();
                        if (result2 == null) {
                            client.status = 2;
                            result.message = "注册失败";
                        }
                        res.json(result);
                    })
                }
            })
        });

};

//获取用户登陆信息;
exports.login = (req,res)=>{
    //设置初始状态;
    const result = {status: 0,message: "登陆成功"};
    //链接数据库,将传进来的验证码和账户信息,与数据可进行对比,如果数据库中含有对应的信息则返回登陆成功;
    //1.验证验证码
    if(req.body.vcode != req.session.vcode){
        result.status=1;
        result.message= "验证码输入错误";
        res.json(result);
        return;
    }else{
        //链接到数据库,查询数据库中是否存在用户信息;
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);
           
                // Get the documents collection
                //获取数据集合;
                const collection = db.collection('accountInfo');
                // 查询数据
                collection.find({
                    username:req.body.username,
                    password:req.body.password
                }).toArray(function(err, docs) {
                  if(docs== null){
                    result.status=2;
                    result.message= "账号或密码错误";
                    res.json(result);
                  }
                  res.json(result);
                });

        });
    }
};