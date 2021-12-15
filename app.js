// 引入
var express = require('express');
const multiparty = require('multiparty');

// 实例化
var app = express();
const bodyParser = require('body-parser');
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Cache-Control", "no-cache");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));//表单数据使用
app.use(bodyParser.json());//json数据使用
// console.log(__dirname);
// console.log(__filename);
app.use('/images', express.static(__dirname + '/public/images'));//静态文件托管

fs = require("fs");

const index = require("./routes/index");
app.use("/", index);


const upload = require("./routes/upload/uploadImg");
app.use("/uploadImg", upload);


const gettingInformation = require("./routes/gettingInformation/gettingInformation");
app.use("/gettingInformation", gettingInformation);


const sendTransaction = require("./routes/sendTransaction/sendTransaction");
app.use("/sendTransaction", sendTransaction);


const contract = require("./routes/contract/ERC20Contract");
app.use("/contract", contract);


const mysql = require("./routes/sql/mysql");
app.use("/mysql", mysql);


var expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile';
var secretOrPrivateKey = "0x783365c495a00a6799793b314fe82205f1e67575917169d692496861cd0e8e84443ee9b04ce1b15bd506ab9006064e968673975713fb0f2582b6e78114600fb41c"  //加密token 校验token时要使用
const setToken = function (secretOrPrivateKey) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({
      secretOrPrivateKey: secretOrPrivateKey
    }, signkey, { expiresIn: 60 * 60 * 24 * 3 });
    // let info = jwt.verify(token.split(' ')[1], signkey)
    // console.log(info);
    console.log('token', token);
    resolve(token);
  })
}
setToken()
// console.log(secretOrPrivateKey, "???")



// 监听端口
app.listen(3000, () => {
  console.log('服务器启动成功，主页地址http://127.0.0.1:3000')
})
