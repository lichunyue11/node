const Web3js = require("web3");
let web3 = new Web3js(new Web3js.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'))
var mysql = require('mysql');

const stringRandom = require('string-random');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root', //账号
    password: '123456', //密码
    database: 'test',//数据库
    multipleStatements: true // 支持执行多条 sql 语句
});
exports.getInfo = async (req, res) => {
    let Random = stringRandom(16)
    console.log(Random, "???")
    let address = web3.eth.accounts.wallet.add('e8cd35475f9bc5d78d12f78a3e3b6a226bc8fd7ccdbbbbef8c4a08630087ae4c')
    console.log(address.address, "address")
    let sign = await web3.eth.sign(Random, address.address)
    console.log(sign, "sign")

    // console.log(__dirname);
    // console.log(__filename);
    //将返回数据存放到本地
    // var sampleObject = {
    //     a: 222,
    //     b: 2,
    //     c: {
    //         x: 11,
    //     }
    // };
    // fs.writeFile("public/object.json", JSON.stringify(sampleObject), (err) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     };
    // });
    res.send('1111')
}
exports.save = (req, res) => {
    // var schema = new mongoose.Schema({ name: String, grades: Number })
    // var stuModel = mongoose.model('grades', schema)
    // //链式调用 通过new 一个Model创建一个 document
    // stuModel.create({ name: "小月", grades: 18 }, function (err, docs) {
    //     console.log(docs)
    //     res.send(docs)
    // })
    let data = `INSERT INTO information( name, age)VALUES(?,?)`
    db.query(data, ['yue', 18], (err, result) => {
        if (err) throw err;
        console.log("存储成功")
        // res.send('存储成功')
    });
    res.send('存储')
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
    let data = `INSERT INTO information( balance)VALUES(?)`
    db.query(data, [Balance], (err, result) => {
        if (err) throw err;
        console.log("存储成功")
        // res.send('存储成功')
    });
    // console.log(Balance, "PPPP")
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