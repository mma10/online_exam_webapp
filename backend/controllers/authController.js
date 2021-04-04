const sql = require('../models/db');

var users={}
const idlen=20;
const base_url='/api/auth/';

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

exports.createToken=(request, response)=>{
    var cookies=parseCookies(request);
    var token=cookies['token'];
    if(!token || !users[token]){
      var id=makeid(idlen);
      while(users[id]) id=makeid(idlen);
      response.cookie('token',id);
      console.log(id);
      users[id]={"logged_in":false};
    }
    response.redirect(base_url+'login/');
}

exports.loginPage=(request, response)=>{
    var cookies=parseCookies(request);
    var token=cookies['token'];
    if(!token || !users[token]) return response.redirect(base_url);
    return response.sendFile(__dirname+'/html/login.html');
}

exports.checkLogin=(request, response)=>{
    var cookies=parseCookies(request);
    var token=cookies['token'];
    if(!token || !users[token]) return response.redirect(base_url);
    if(users[token]["logged_in"]) return response.send('Already Logged In');
    var uname=request.body.uname;
    var pass=request.body.pass;
    var actype=request.body.actype;
    if(!uname || !pass || !actype){
        console.log("Crededntial are null");
        return response.send("Crededntial are null");
    }
    q="select * from "+actype+" where uname = '"+uname+"' and password = '"+pass+"'";
    sql.query(q,(err,results,fields)=>{
      if(err){console.log(err);return response.send("Error");}
      if(results.length<=0) response.send("Invalid Data");
      else{
        users[token]={"uname":uname,"pass":pass,"actype":actype,"logged_in":true};
        response.send("Login Successfull");
      }
    });
}

exports.logout=(request,response)=>{
    var cookies=parseCookies(request);
    var token=cookies['token'];
    if(!token || !users[token]) return response.redirect(base_url);
    if(users[token]["logged_in"]){
      response.clearCookie('token');
      delete(users.token);
      return response.send('Logged out');
    }
    return response.send('Some Data Error Occured');
}


exports.checkAuth=(request)=>{
  var cookies=parseCookies(request);
  var token=cookies['token'];
  if(!token || !users[token]) return null;
  if(!users[token].logged_in) return null;
  return users[token];
}