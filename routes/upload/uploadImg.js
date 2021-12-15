var express = require('express');
var router = express.Router();

let upload = require("../../controllers/upload")

//获取表单提交的数据 以及post过来的图片
router.post('/upload', upload.uploadImg)
module.exports = router;