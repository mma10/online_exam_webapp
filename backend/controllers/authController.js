var sql = require('../models/db');

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

exports.createToken=(request, response)=>{
    var token=String(request.params.token);
    if(!token || token=="" || !users[token]){
      var id=makeid(idlen);
      while(users[id]) id=makeid(idlen);
      console.log(id);
      users[id]={"logged_in":false};
      response.status(200).json({
        id:id
      });
    }
    else if(users[token]["logged_in"] == true){
      response.json({
        msg: "Already logged in"
      });
    }
    else
      response.status(200).json({
        msg:"Please Login"
      });; 
}

exports.loginPage=(request, response)=>{
    var token=String(request.params.token);
    if(!token || token=="" || !users[token]) return response.redirect(base_url);
    if(!users[token]['logged_in']) return response.send('Please login through the form');
    else{
      return response.status(200).json({
        msg: "Already Logged In"
      });
    };
}

exports.checkLogin=(request, response)=>{
    var token=String(request.params.token);
    if(!token || token=="" || !users[token]) return response.redirect(base_url);
    if(users[token]["logged_in"]){
      return response.status(200).json({
        msg: "Already Logged In"
      });
    };
    var uname=request.body.uname;
    var pass=request.body.pass;
    var actype=request.body.actype;
    if(!uname || !pass || !actype){
        console.log("Crededntial are null");
        return response.status(200).json({
          msg :"Crededntial are null"
        });
    }
    q="select * from "+actype+" where uname = '"+uname+"' and password = '"+pass+"'";
    sql.query(q,(err,results,fields)=>{
      if(err){
        sql=require('../models/db');
        console.log(err);
        return response.status(400).json({
          msg :"Error"
        });
      }
      if(results.length<=0){
        return response.status(404).json({
          msg :"Invalid Data"
        });
      }
      else{
        users[token]={"uname":uname,"pass":pass,"actype":actype,"logged_in":true};
        return response.status(200).json({
          msg :"Login Successfull"
        });
      }
    });
}

exports.logout=(request,response)=>{
    var token=String(request.params.token);
    if(!token || token=="" || !users[token]) return response.redirect(base_url);
    if(users[token]["logged_in"]){
      response.clearCookie('token');
      delete(users.token);
      return response.status(200).json({
        msg :"Logged Out"
      });
    }
    return response.status(400).json({
      msg :"Some Error Occured"
    });
}


exports.checkAuth=(request)=>{
  var token=String(request.params.token);
  if(!token || token=="" || !users[token]) return null;
  if(!users[token].logged_in) return null;
  return users[token];
}