var sql = require('../models/db.js');
const auth=require('./authController.js');
const base_url='/api/auth/';

const execute=function(q){
    return new Promise((resolve,reject)=>{
        sql.query(q,(err,res,field)=>{
            if(err) reject(err);
            resolve(res);
        });
    })
};

exports.findAllStudents=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    }
        
    var q = "SELECT * FROM student";
    sql.query(q, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        //console.log(results);
        console.log("Retrieved all subject list");
        return res.status(200).json(results);
    });
};

exports.findAllAdmins=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(200).json({
            msg :"You Don't Have Management Account"
        });
    }

    var q = "select * from admin";
    sql.query(q, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(200).json({
                msg :"Error"
            });
        }
        //console.log(results);
        console.log("Retrieved all admin list");
        return res.status(200).json(results);
    });
        
    // var q = "select a.ad_id,a.name ad_name,s.sub_id,s.name sub_name from admin a,subject s,adminsub asb where "
    //         +"a.ad_id=asb.ad_id and s.sub_id=asb.sub_id";
    // sql.query(q, (err, results, fields) => {
    //     if(err){
    //         sql=require('../models/db');
    //         console.log(err);
    //         return res.status(200).json({
    //             msg :"Error"
    //         });
    //     }
    //     //console.log(results);
    //     console.log("Retrieved all Admins list with their subjects");
    //     var arr={};
    //     results.forEach(ele => {
    //         if(arr[ele.ad_id]){
    //             arr[ele.ad_id].subjects.push({sub_id:ele.sub_id,sub_name:ele.sub_name});
    //         }
    //         else{
    //             arr[ele.ad_id]={admin_name:ele.ad_name,subjects:[{sub_id:ele.sub_id,sub_name:ele.sub_name}]}
    //         }
    //     });
    //     return res.status(200).json(arr);
    // });
};

exports.findAllInvigilators = (req, res) =>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    }

    var q = "select * from invigilator";
    sql.query(q, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }

        console.log("Retrieved all invigilators list");
        return res.status(200).json(results);     
    });  
}


exports.findAllExams=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    }
        
    var q = "select * from exam e,subject s where e.sub_id=s.sub_id order by class";
    sql.query(q, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        //console.log(results);
        console.log("Retrieved all Exams list");
        return res.status(200).json(results);
    });
};



exports.setNextAcademicYear=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    }
    var q="SELECT st_id,count(*) c FROM registration GROUP BY st_id";
    var q1="SELECT t.st_id,COUNT(*) c "+
        "from (SELECT reg.st_id,reg.sub_id FROM "+
        "result res,exam e,registration reg WHERE "+
        "reg.st_id=res.st_id and reg.sub_id=res.sub_id "+
        "and e.sub_id=reg.sub_id and res.marks>=e.passing_marks) t "+
        "GROUP BY t.st_id";
    q="select distinct t1.st_id from ("+q+") t1,("+q1+") t2 where t1.c=t2.c and t1.st_id=t2.st_id";
    //console.log(q);
    var r=execute(q);
    r.then(result=>{
        console.log(result);
    }).catch(e=>{
        return res.status(400).json({
            msg:"Error"
        });
    });
    r=execute("update student set class=class+1 where st_id in("+q+")");
    r.then(_=>{
        var r1=execute("delete from registration");
        r1.then(_=>{
            var r2=execute("delete from exams");
            r2.then(_=>{
                var register="insert into registration(st_id,sub_id) "+
                "(select st.st_id,sb.sub_id from student st,subject sb where st.class=sb.class and st.st_id in("+q+"))"
                var r3=execute(register);
                r3.then(_=>{
                    return res.status(200).json({
                        msg:"Next Acedamic Year is Set"
                    });
                }).catch(e=>{
                    return res.status(400).json({
                        msg:"Error"
                    });
                });;
            }).catch(e=>{
                return res.status(400).json({
                    msg:"Error"
                });
            });
        }).catch(e=>{
            return res.status(400).json({
                msg:"Error"
            });
        });
    }).catch(e=>{
        return res.status(400).json({
            msg:"Error"
        });
    });;
};


exports.addStudent=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(404).json({
            msg :"You Don't Have Management Account"
        });
    };
    var q="select max(st_id) m from student";
    sql.query(q, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        var q1="insert into student(st_id,uname,sname,password,class,batch) "+
        "values ?";
        var id=parseInt(results[0].m);
        var uname=req.body.username;
        var sname=req.body.name;
        var password=req.body.password;
        var class_=req.body.class;
        var batch=req.body.batch;
        var values=[[id+1,uname,sname,password,class_,batch]];
        sql.query(q1,[values], (err, results, fields) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                return res.status(400).json({
                    msg :"Error"
                });
            };
            
            return res.status(200).json({
                msg :"Student Added"
            });            
        });
    });
};



exports.addAdmin=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    };

    // body = {
    //     uname: 
    //     name:
    //     password:
    //     subjects : [{sub_id: , sub_name: }]
    // }

    // {
    //     "uname": "temp_admin",
    //     "name": "temp_admin",
    //     "password": "abcd",
    //     "subjects": [{1, "english"}, {2, "maths"}] 
    // } 

    var q="select max(ad_id) m from admin";
    sql.query(q, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        var q="insert into admin(ad_id,uname,name,password) "+
        "values ?";
        var id=parseInt(results[0].m);
        var uname=req.body.uname;
        var name=req.body.name;
        var password=req.body.password;
        var subjects = req.body.subjects;
        var values=[[id+1,uname,name,password]];
        sql.query(q1,values, (err, results, fields) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                return res.status(400).json({
                    msg :"Error"
                });
            };
            return res.status(200).json({
                msg :"Admin Added"
            });
        });
        var q = "insert into adminsub(sub_id, ad_id) values ?";
        var values = [];
        subjects.forEach(subject => {
            var temp = [];
            temp.push(subject.sub_id);
            temp.push(id+1);
            values.push(temp);
        });

        sql.query(q, [values], (err, results, fields) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                return res.status(200).json({
                    msg :"Error"
                });
            }
            var numberResAdded = results.affectedRows;
            console.log("total rows inserted into adminsub table : " + numberResAdded + " ");
            return res.status(200).json({
                msg :"Subjects of admin added in adminsub table"
            });
        });
    });
};

exports.addInv=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    };
    var q="select max(inv_id) m from invigilator";
    sql.query(q, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        var q1="insert into invigilator(inv_id,uname,name,password) "+
        "values ?";
        var id=parseInt(results[0].m);
        var uname=req.body.username;
        var name=req.body.name;
        var password=req.body.password;
        var values=[[id+1,uname,name,password]];
        sql.query(q1,[values], (err, results, fields) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                return res.status(400).json({
                    msg :"Error"
                });
            };
            return res.status(200).json({
                msg :"Invigilator Added"
            });
        });
    });
};

exports.checkExamTime=(req, res) => {
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(200).json({
            msg :"You Don't Have Management Account"
        });
    };

    var eid = req.body.eid;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;

    var q="update exam set start_time = ?, end_time = ? where eid = ?";
    sql.query(q, [start_time, end_time, eid], (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(200).json({
                msg :"Error"
            });
        }
        return res.status(200).json({
            msg :"Exam time changed"
        });
    });
}


exports.assgnExam=(req,res)=>{
    // {
    //     "id" : 1,
    //     "name" : "inv1",
    //     "exams" : [1, 2]
    // }
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    };   
    var exam_id = parseInt(req.params.exam_id);
    var inv_id = parseInt(req.params.inv_id);
    var q="insert into examinv(eid,inv_id) values ?";
    var values = [[exam_id,inv_id]];
    sql.query(q,[values],(err,results,fields)=>{
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        };

        var numberResAdded = results.affectedRows;
        console.log("total rows inserted into examinv table : " + numberResAdded + " ");

        return res.status(200).json({
            msg :"Exam Assigned"
        });
    });
}


exports.rmvExam=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    };
    var inv_id = parseInt(req.params.inv_id);
    var exam_id = parseInt(req.params.exam_id);
    var q="delete from examinv where eid=? and inv_id=?";
    sql.query(q,[exam_id,inv_id],(err,result,field)=>{
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        };
        return res.status(200).json({
            msg :"Exam Unassigned"
        });
    });
}

exports.deleteStudent=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    };
    var st_id = parseInt(req.params.student_id);
    var q="delete from student where st_id=?";
    sql.query(q,[st_id],(err,result,field)=>{
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        };
        return res.status(200).json({
            msg :"Student Deleted"
        });
    });
}

exports.deleteAdmin=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(200).json({
            msg :"You Don't Have Management Account"
        });
    };
    var ad_id = parseInt(req.params.admin_id);
    var q="delete from admin where ad_id=?";
    sql.query(q,[ad_id],(err,result,field)=>{
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(200).json({
                msg :"Error"
            });
        };
        return res.status(200).json({
            msg :"Admin Deleted"
        });
    });
}

exports.deleteExam=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(200).json({
            msg :"You Don't Have Management Account"
        });
    };
    var eid = parseInt(req.params.exam_id);
    var q="delete from exam where eid=?";
    sql.query(q,[eid],(err,result,field)=>{
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(200).json({
                msg :"Error"
            });
        };
        return res.status(200).json({
            msg :"Exam Deleted"
        });
    });
}

exports.deleteInv=(req,res)=>{
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='management'){
        return res.status(401).json({
            msg :"You Don't Have Management Account"
        });
    };
    var inv_id = parseInt(req.params.inv_id);
    var q="delete from invigilator where inv_id=?";
    sql.query(q,[inv_id],(err,result,field)=>{
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        };
        return res.status(200).json({
            msg :"Invigilator Deleted"
        });
    });
}