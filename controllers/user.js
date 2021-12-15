const jwt = require('jsonwebtoken');

//秘钥
var signkey = 'mes_qdhd_mobile';
//生成token
const setToken = function (username) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            username: username
        }, signkey, { expiresIn: 60 * 60 * 24 * 3 });
        console.log('token', token);
        resolve(token);
    })
}
//验证token
const verToken = function (token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token, signkey, (error, decoded) => {
            if (error) {
                console.log(error.message)
                return
            }
            console.log(decoded)
        });
        resolve(info);
    })
}