// Import dependencies

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// Connect to MySQL

const mysql = require('mysql');
var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "lJForg58Kr",
    password: "GOgHlsKN1d",
    database:"lJForg58Kr"
});  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// APIs

app.get('/demo',(req,res) => {
    res.json({
        "data": "done"
    });
});

const port = process.env.PORT || 4000;
app.listen(port);
