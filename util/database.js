const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'jihad@1234',
    database:'node-app',
})


module.exports = pool.promise()