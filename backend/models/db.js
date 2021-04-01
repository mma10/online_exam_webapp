// Set variable for connection to MySQL

const mysql = require('mysql');
var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "lJForg58Kr",
    password: "GOgHlsKN1d",
    database:"lJForg58Kr"
});  

module.exports = con;