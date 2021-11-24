var express = require('express');
var router = express.Router();

// 引入上传图片的模块
const multiparty = require('multiparty');

// 要返回的 json 数据
var myResult = {
  code: "",
  message: "默认",
  token: ""
}
//获取表单提交的数据 以及post过来的图片
router.post('/uploadimg', function (req, res) {

  //获取表单的数据 以及post过来的图片

  var form = new multiparty.Form();

  form.uploadDir = 'img'   //上传图片保存的地址     目录必须存在

  form.parse(req, function (err, fields, files) {

    //获取提交的数据以及图片上传成功返回的图片信息
    // console.log(fields);  /*获取表单的数据*/
    // console.log(files,"???");  /*图片上传成功返回的信息*/
    // 拿到的是 提交的数据 和图片 路径 保存到数据库表中

    files.image[0].path = 'http://127.0.0.1:3000/' + files.image[0].path
    myResult.code = "200";
    myResult.message = "成功";
    myResult.data = {
      fields,
      files
    }
    res.send(myResult);
  });
})
module.exports = router;