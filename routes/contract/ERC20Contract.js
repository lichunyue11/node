var express = require('express');
var router = express.Router();
const Web3js = require("web3");
let web3 = new Web3js(new Web3js.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'))
const ERC20Abi = require('../../public/erc20.json')
const ERC20urchaseAbi = require('../../public/erc20purchase.json')

const erc20Contract = new web3.eth.Contract(ERC20Abi, '0xa5A4f7C17012C1dcCCAD0FB73C3C9f7540027505')
const purchaseContract = new web3.eth.Contract(ERC20urchaseAbi, '0xfCa98E79b438Bed2CaAF1e88f6036a0654609C10')
//   erc20  转账事件
router.get('/transferEvent', async (req, res) => {
  let transfer = await erc20Contract.events.Transfer('0xF16F14179457B2587B2ba9EE8c4Da332310ddfe5', '0xc2d6Aa17ef865C91015464fa7b900727128C00d3', 0)
  res.send(transfer)
})

router.get('/transfer', async (req, res) => {

  let addressBook = web3.eth.accounts.wallet.add('d3b07e7e1e529d4d8d4a58589bc644dbff247791748f7dd5f5e3e9d13487822a')
  console.log(addressBook.address, "addressBook")
  let approveGas = await erc20Contract.methods.transfer('0xfCa98E79b438Bed2CaAF1e88f6036a0654609C10',
    "0").estimateGas({ from: addressBook.address })
  await erc20Contract.methods.transfer('0xc2d6Aa17ef865C91015464fa7b900727128C00d3', 0).send({ from: addressBook.address, gas: approveGas }).then((resolve) => {
    res.send(resolve)
    let w_data = JSON.stringify(resolve)
    fs.writeFile(__dirname + '/transfer.txt', w_data + "\n", { flag: 'a' }, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log('写入成功');
      }
    });
  }).catch((err) => {
    console.log(err)
  });

  let transfer = await erc20Contract.events.Transfer('0xF16F14179457B2587B2ba9EE8c4Da332310ddfe5', '0xc2d6Aa17ef865C91015464fa7b900727128C00d3', 0)
})



router.get('/approval', async (req, res) => {
  let transfer = await erc20Contract.events.Approval('0xF16F14179457B2587B2ba9EE8c4Da332310ddfe5', '0xa5A4f7C17012C1dcCCAD0FB73C3C9f7540027505', 0)
  res.send(transfer)
})

router.get('/allowance', async (req, res) => {

  erc20Contract.methods.allowance('0xF16F14179457B2587B2ba9EE8c4Da332310ddfe5', '0xfCa98E79b438Bed2CaAF1e88f6036a0654609C10').call().then((resolve) => {
    res.send(resolve)
  }).catch((err) => {
    console.log(err, "33")
  });
})
router.get('/approve', async (req, res) => {
  let addressBook = web3.eth.accounts.wallet.add('d3b07e7e1e529d4d8d4a58589bc644dbff247791748f7dd5f5e3e9d13487822a')

  let approveGas = await erc20Contract.methods.approve('0xfCa98E79b438Bed2CaAF1e88f6036a0654609C10', "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").estimateGas({ from: addressBook.address })
  res.send(22)
  erc20Contract.methods.approve('0xfCa98E79b438Bed2CaAF1e88f6036a0654609C10', "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({ from: this.address, gas: approveGas }).then((resolve) => {
    res.send(resolve)
  }).catch((err) => {
    console.log(err, "33")
  });
})
router.get('/purchase', async (req, res) => {

  let addressBook = web3.eth.accounts.wallet.add('d3b07e7e1e529d4d8d4a58589bc644dbff247791748f7dd5f5e3e9d13487822a')

  let getPurchaseGas = await purchaseContract.methods.purchase('1').estimateGas({ from: addressBook.address })

  purchaseContract.methods.purchase("1").send({ from: addressBook.address, gas: getPurchaseGas }).then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err)
  });
  // console.log(web3.eth.accounts.wallet)

})

module.exports = router;