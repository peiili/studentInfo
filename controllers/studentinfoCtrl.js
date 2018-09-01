const path = require("path");
const xtpl = require("xtpl");

//调用工具;
const databasetools = require(path.join(__dirname, "../tools/databasetools.js"));
//查询列表页面
exports.studentInfopage = (req, res) => {
    const keyword = req.query.keyword || "";
    databasetools.findinfolist("studentInfo", keyword, (err, docs) => {
        //当数据获取成功以后,渲染页面;
        xtpl.renderFile(path.join(__dirname, "../statics/views/infoPagechild.html"), {
            //获取数据库中的列表信息;查询数据库;
            students: docs,
            keywordVal: keyword,
            user: req.session.username,
        }, function (err, content) {
            //通过模板将内容渲染到浏览器;
            res.send(content)
        });
    })
}

//返回用户请求的新增学生信息的请求;
exports.addStudent = (req, res) => {
    xtpl.renderFile(path.join(__dirname, "../statics/views/addStudent.html"), {
        user: req.session.username,
    }, (err, content) => {
        res.send(content);
    });
}

//新增学生信息;
exports.insertData = (req, res) => {
    //调用方法;
    databasetools.insertData(req.body, "studentInfo", (err, res1) => {
        if (res1) {
            //有成功返回值,跳转到列表页面;
            res.send(`<script>window.location.href="/info/studentinfo"</script>`)
        } else {
            //增加失败,弹出失败窗口
            res.send(`<script>alert("新增失败")</script>`);
        }
    })
}

//新增修改学生信息页面
exports.editstudentInfo = (req, res) => {
    //通过传进来的id的值,获取对应的学生的信息,并渲染页面;
    //调用获取数据库的方法;
    databasetools.findData({_id:databasetools.ObjectId(req.params.studentId)},"studentInfo", (err, doc) => {
        xtpl.renderFile(path.join(__dirname, "../statics/views/edit.html"), {
            doc,
        }, (err, content) => {
            res.send(content);
        })
    })
}

//提交修改学生信息;
exports.edit = (req,res)=>{
    databasetools.upData({_id:databasetools.ObjectId(req.params.studentId)},req.body,"studentInfo",(err,reslute)=>{
        if(reslute){
            res.send(`<script>location.href="/info/studentinfo";</script>`);
        }else{
            res.send(`<script>alert("新增失败")</script>`);
        }
    })  
}

//删除学生信息;
exports.del = (req,res)=>{
    databasetools.deleteOne({_id:databasetools.ObjectId(req.params.studentId)},"studentInfo",(err,reslute)=>{
        if(reslute == null){
            res.send(`<script>alert("删除失败")</script>`);
   username
        }else{
            res.send(`<script>location.href="/info/studentinfo";</script>`);

        }
    })  
}

//退出登陆
exports.logout =(req,res)=>{
    req.session.name = null;
}