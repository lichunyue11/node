// 引入
var express = require('express');


// 实例化
var app = express();
const bodyParser = require('body-parser');
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");//这个不去掉  静态托管文件中图片是乱码
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//  静态文件的托管，在 img 目录下找到图片
// http://127.0.0.1:3000/image/Zb70_df1MeSlJMh2bQS-x7YM.png
app.use('/image', express.static('img'));
fs = require("fs");

const index = require("./routes/index");
app.use("/", index);


const upload = require("./routes/uploadImg");
app.use("/uploadImg", upload);


const gettingInformation = require("./routes/gettingInformation");
app.use("/gettingInformation", gettingInformation);


const sendTransaction = require("./routes/sendTransaction");
app.use("/sendTransaction", sendTransaction);


const contract = require("./routes/ERC20Contract");
app.use("/contract", contract);


const mysql = require("./routes/mysql");
app.use("/mysql", mysql);



// 监听端口
app.listen(3000, () => {
  console.log('服务器启动成功，主页地址http://127.0.0.1:3000')
})