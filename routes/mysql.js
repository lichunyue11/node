var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root', //账号
    password: 'xiaoyue1111', //密码
    database: 'test',//数据库
    multipleStatements: true // 支持执行多条 sql 语句
});
//连接数据库
router.get('/connect', async (req, res) => {
    db.connect((err) => {
        if (err) throw err;
        res.send("打开数据库成功")
    });
})
//创建表
router.get('/createSurface', async (req, res) => {

    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("posts表已经建立")
    })
})
router.post('/saveData', async (req, res) => {
    // res.send(req.query)
    console.log(req.body.sex)
    let data = `INSERT INTO posts( age, sex ,username)VALUES(?,?,?)`
    db.query(data, [req.body.age, req.body.sex, req.body.name], (err, result) => {
        if (err) throw err;
        res.send('存储成功')
    });

})
router.get('/getData', async (req, res) => {
    let data = 'SELECT * FROM posts'
    db.query(data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    });
})

router.get('/delData', async (req, res) => {
    let data = 'DELETE FROM posts WHERE id =?'
    db.query(data, [req.query.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    });
})

router.get('/setData', async (req, res) => {
    let modSql = 'UPDATE posts SET age = ? WHERE Id = ?';
    let modSqlParams = [req.query.age, req.query.id];

    db.query(modSql, modSqlParams, (err, results, fields) => {
        if (err) {
            console.log('UPDATE ERROR - ', err.message);
            throw err
        }
        res.send(results)
        console.log(results)
    })

})

module.exports = router;