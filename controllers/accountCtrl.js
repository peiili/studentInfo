
const path = require("path");

//获取页面信息;
exports.register = (req,res)=>{
    res.sendFile(path.join(__dirname,"../statics/views/register.html"));
};