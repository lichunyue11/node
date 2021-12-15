var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root', //账号
    password: '123456', //密码
    database: 'test',//数据库
    multipleStatements: true // 支持执行多条 sql 语句
});
// 引入上传图片的模块
const multiparty = require('multiparty');

exports.uploadImg = (req, res) => {
    // multiparty  解析formData插件
    let form = new multiparty.Form();
    var path = require('path');
    console.log(__dirname, "??")
    form.uploadDir = path.resolve(__dirname, '../public/images');//文件上传位置
    form.keepExtensions = true;   //是否保留后缀
    // form.autoFiels = true;       //启用文件事件，并禁用部分文件事件，如果监听文件事件，则默认为true。
    form.parse(req, function (err, fields, files) {  //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
        if (err) {
            console.log(111)
            res.json({
                status: "1",
                msg: "上传失败！" + err
            });
        } else {
            console.log(files)
            res.json({
                status: "0",
                msg: "上传成功！",
                personPicture: "http://localhost:3000" + files.image[0].path.split("public")[1]
            });
        }
        let url = "http://localhost:3000" + files.image[0].path.split("public")[1]
        let data = `INSERT INTO upload( imgUrl)VALUES(?)`
        db.query(data, [url], (err, result) => {
            if (err) throw err;
            console.log("存储成功")
            // res.send('存储成功')
        });
    });
}