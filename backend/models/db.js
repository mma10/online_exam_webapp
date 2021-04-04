// Set variable for connection to MySQL

const mysql = require('mysql');

// Setup database config

var db_config = {
    host: "remotemysql.com",
    user: "lJForg58Kr",
    password: "GOgHlsKN1d",
    database:"lJForg58Kr"
};

// Handling disconnect in MYSql

var con;
function handleDisconnect() {
  con = mysql.createConnection(db_config);

  con.connect(function(err) {
    if(err) {
      console.log('Error When Connecting to DB : ', err);
      setTimeout(handleDisconnect, 2000);
    }
    console.log("Connected");
  });
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = con;