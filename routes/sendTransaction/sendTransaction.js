var express = require('express');
var router = express.Router();
const Web3js = require("web3");
let web3 = new Web3js(new Web3js.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'))
//发送交易
router.get('/sendTransaction', async (req, res) => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  group(arr, 5)
  // let addressBook = web3.eth.accounts.wallet.add('d3b07e7e1e529d4d8d4a58589bc644dbff247791748f7dd5f5e3e9d13487822a')
  // let addressTo = web3.eth.accounts.wallet.add('b345887efa70841ffb89f712a6407bb6be5dd16b4d9569e6051dfb83847cd32c')

  // let Transaction = {
  //   from: addressBook.address,
  //   to: addressTo.address,
  //   value: '1000',
  //   gas: 2000000
  // }
  // const receipt = await web3.eth.sendTransaction(Transaction);
  // res.send(receipt)
})
function group(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  for (let i = 0; i < newArray.length; i++) {
    console.log(newArray[i])
  }
  // console.log(newArray, "????")
  // return newArray;
}


//   发送签名交易
router.get('/sendSignedTransaction', async (req, res) => {
  let signTransaction = await web3.eth.accounts.signTransaction({
    to: '0xc2d6Aa17ef865C91015464fa7b900727128C00d3',
    value: '100',
    gas: 2000000
  }, 'b345887efa70841ffb89f712a6407bb6be5dd16b4d9569e6051dfb83847cd32c')
  const receipt = await web3.eth.sendSignedTransaction(signTransaction.rawTransaction);
  var w_data = JSON.stringify(receipt);

  //"\n" 表示换行
  //{ flag: 'a' }  之前内容不清空
  fs.writeFile(__dirname + '/sendSignedTransaction.txt', w_data + "\n", { flag: 'a' }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('写入成功');
    }
  });
  res.send(receipt)
})



router.get('/getTransaction', async (req, res) => {

  fs.readFile(__dirname + '/sendSignedTransaction.txt', { flag: 'a+' }, function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data.toString().split("\n"));
  });


})


module.exports = router;