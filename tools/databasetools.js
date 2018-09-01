/**
 * 将链接数据库的方法封装为一个工具;
 * 
 */
//导入数据操作包;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
 // 导出
exports.ObjectId = ObjectId;
// 数据库地址;
const url = 'mongodb://localhost:27017';
// 根据数据库名称链接数据库;
const dbName = 'szhmqd21';

/**
 * 获取学生信息列表工具;
 * 暴露给控制器用的，查询列表的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.findinfolist = (collectionName,params,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
       
        const db = client.db(dbName);
        //查询数据库;
        const collection = db.collection(collectionName);
        // 根据条件查询;
        collection.find({name:{$regex:params}}).toArray(function (err, docs) {
            client.close();  
            //把返回的结果回调给控制台;
            callback(err,docs);
        })
    })
}

/**
 * 数据库查询工具;
 * 暴露给控制器用的，查询列表的方法
 * @param {*} collectionName 集合名称;
 * @param {*} params post请求参数;
 * @param {*} callback 回调函数
 */

exports.findData = (params,collectionName,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    const db = client.db(dbName);
    // Get the documents collection
    //获取数据集合;
    const collection = db.collection(collectionName);
    collection.findOne(params,(err, docs)=>{    
        client.close();
        callback(err,docs);
    });
})
}

/**
 * 增加学生信息列表工具;
 * 暴露给控制器用的，查询列表的方法
 * @param {*} params 数据参数;
 * @param {*} collectionName 集合名称
 * @param {*} callback 回调函数
 */
exports.insertData = (params,collectionName,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        //使用增加数据的方法;
        collection.insertOne(params,(err,res2)=>{
            client.close();
            callback(err,res2);
        })
    })
}
/**
 * 修改学生信息列表工具;
 * 暴露给控制器用的，查询列表的方法
 * @param {*} params 数据参数;
 * @param {*} collectionName 集合名称
 * @param {*} condition id条件
 * @param {*} callback 回调函数
 */
exports.upData = (condition,params,collectionName,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.updateOne(condition,{ $set:params },(err, result)=> {
            client.close();
            callback(err,result)
          });  
        
    })
};

/**
 * 删除学生信息列表工具;
 * 暴露给控制器用的，查询列表的方法
 * @param {*} condition 删除条件名称
 * @param {*} collectionName 数据库名称
 * @param {*} callback 回调函数
 */
exports.deleteOne = (condition,collectionName,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        //删除数据的方法;
        collection.deleteOne(condition, function(err, result) {
            client.close();
            callback(err,result);
          });    
    })
};


exports.ObjectId = ObjectId;