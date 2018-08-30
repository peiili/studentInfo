const path = require("path");
const xtpl = require("xtpl");
//引入数据库文件;
const MongoClient = require('mongodb').MongoClient;
// 数据库地址;
const url = 'mongodb://localhost:27017';
// 根据数据库名称链接数据库;
const dbName = 'szhmqd21';


exports.studentInfopage = (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
       
        const db = client.db(dbName);
        //查询数据库;
        const collection = db.collection('studentInfo');
        // 根据条件查询;
        const keyword = req.query.keyword||"";
        collection.find({name:{$regex:keyword}}).toArray(function (err, docs) {
            client.close();  
            //当数据获取成功以后,渲染页面;
            xtpl.renderFile(path.join(__dirname, "../statics/views/infoPagechild.html"), {
                //获取数据库中的列表信息;查询数据库;
                students: docs,
                keywordVal:keyword
            }, function (err, content) {
                //通过模板将内容渲染到浏览器;
                res.send(content)
            });
        })
    })
}