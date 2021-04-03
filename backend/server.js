const express = require('express');
const cors = require('cors');
const con = require('./models/db');

const app = express();
app.use(express.json());

// Connect to MySQL

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Auth

var users={}
const idlen=20;

function makeid(length) {
  var result='';
  var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength=characters.length;
  for ( var i=0;i<length;i++){
     result+=characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function parseCookies (request) {
  var list = {},rc = request.headers.cookie;
  rc && rc.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return list;
}


app.get('/',(request, response)=>{
  var cookies=parseCookies(request);
  var token=cookies['token'];
  if(!token || !users[token]){
    var id=makeid(idlen);
    while(users[id]) id=makeid(idlen);
    response.cookie('token',id);
    console.log(id);
    users[id]={"logged_in":false};
  }
  response.redirect('/login');
})

app.get('/login',(request, response)=>{
  var cookies=parseCookies(request);
  var token=cookies['token'];
  if(!token || !users[token]) return response.redirect('/');
  return response.send('please login');
})

app.post('/check',(request, response)=>{
  var cookies=parseCookies(request);
  var token=cookies['token'];
  if(!token || !users[token]) return response.redirect('/');
  if(users[token]["logged_in"]) return response.send('Already Logged In');
  var uname=request.body.uname;
  var pass=request.body.pass;
  var actype=request.body.actype;
  q="select * from "+actype+" where uname = '"+uname+"' and password = '"+pass+"'";
  con.con.query(q,(err,results,fields)=>{
    if(err){console.log(err);return response.send("Error");}
    if(results.length<=0) response.status(404).send("Invalid Data");
    else{
      users[token]={"uname":uname,"pass":pass,"actype":actype,"logged_in":true};  
      response.status(200).send("Login Successfull");
    }
  });
})


// APIs

app.use('/api/auth/',require('./routes/authRoutes'));
app.use('/api/student/',require('./routes/studentRoutes'));
app.use('/api/admin/',require('./routes/adminRoutes'));

// Run the port on 4000

const port = process.env.PORT || 4000;
app.listen(port);
