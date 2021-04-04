// Set variable for connection to MySQL

// const mysql = require('mysql');
// var con = mysql.createConnection({
//     host: "remotemysql.com",
//     user: "lJForg58Kr",
//     password: "GOgHlsKN1d",
//     database:"lJForg58Kr"
// });

const mysql = require('mysql');
var db_config = {
    host: "remotemysql.com",
    user: "lJForg58Kr",
    password: "GOgHlsKN1d",
    database:"lJForg58Kr"
};

var con;

function handleDisconnect() {
  con = mysql.createConnection(db_config);

  con.connect(function(err) {
    if(err) {
      console.log('Error When Connecting to DB : ', err);
      handleDisconnect();
    }
    else{
      module.exports = con;
      console.log('Connected...');
    }
  });
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code=='PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
    //handleDisconnect();
  });
}

handleDisconnect();
module.exports = con;