var express = require('express');
var router = express.Router();

let getInformationFile = require("../controllers/gettingInformation")
router.get('/', getInformationFile.getInfo)
router.get('/save', getInformationFile.save)
router.get('/find', getInformationFile.find)
router.get('/getBalance', getInformationFile.getBalance)
router.get('/Block', getInformationFile.block)
router.get('/getBlockNumber', getInformationFile.blockNumber)
router.get('/getTransaction', getInformationFile.transaction)
router.get('/getTransactionCount', getInformationFile.transactionCount)


module.exports = router;