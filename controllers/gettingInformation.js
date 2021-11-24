const Web3js = require("web3");
let web3 = new Web3js(new Web3js.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'))
// //引入模块
// var mongoose = require('mongoose');
// //连接数据库
// mongoose.connect('mongodb://localhost:27017/test');
// //得到数据库连接句柄
// var db = mongoose.connection;

//通过数据库连接句柄，监听mongoose数据库成功的事件
// db.on('open', function (err) {
//     if (err) {
//         console.log('数据库连接失败');
//         throw err;
//     }
//     console.log('数据库连接成功')
// })
exports.getInfo = (req, res) => {
    //将返回数据存放到本地
    var sampleObject = {
        a: 222,
        b: 2,
        c: {
            x: 11,
        }
    };
    fs.writeFile("public/object.json", JSON.stringify(sampleObject), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });

}
exports.save = (req, res) => {
    var schema = new mongoose.Schema({ name: String, grades: Number })
    var stuModel = mongoose.model('grades', schema)
    //链式调用 通过new 一个Model创建一个 document
    stuModel.create({ name: "小月", grades: 18 }, function (err, docs) {
        console.log(docs)
        res.send(docs)
    })
}
exports.find = (req, res) => {
    var schema = new mongoose.Schema({ name: String, grades: Number })
    var stuModel = mongoose.model('grades', schema)
    stuModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        }
    })
}

exports.getBalance = async (req, res) => {
    console.log(web3, "??")
    let Balance = await web3.eth.getBalance('0xF16F14179457B2587B2ba9EE8c4Da332310ddfe5')
    console.log(Balance, "PPPP")
    res.send(Balance)
}
exports.block = async (req, res) => {
    let Block = await web3.eth.getBlock(123)
    console.log(Block, "PPPP")
    res.send(Block)
}
exports.blockNumber = async (req, res) => {
    let BlockNumber = await web3.eth.getBlockNumber()
    console.log(BlockNumber.toString(), "PPPP")
    res.send(BlockNumber.toString())
}
exports.transaction = async (req, res) => {
    console.log(req.query)
    let Transaction = await web3.eth.getTransaction('0x3daf22938d5286e09e978cf162359f1d2ca64d96af91530cd1f83a321926e4ec')
    res.send(Transaction)
}
exports.transactionCount = async (req, res) => {
    let TransactionCount = await web3.eth.getTransactionCount('0xc2d6Aa17ef865C91015464fa7b900727128C00d3');
    res.send(TransactionCount.toString())
}