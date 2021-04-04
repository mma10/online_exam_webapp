const sql = require('../models/db.js');
const auth=require('./authController.js');
const base_url='/api/auth/';


exports.findAllSubjects = (req,res) => {
    var details=auth.checkAuth(req);
    if(!details || details['actype']!='admin') return res.redirect(base_url);
    var unamequery="select * from admin where uname = '"+details['uname']+"'";
    var admin_id = parseInt(req.params.admin_id);
    sql.query(unamequery, (err, results, fields) => {
        if(err) throw err;
        if(results[0]['ad_id']!=admin_id){return res.send("Invalid admin id");}
        var q = "select sub_id from adminsub where ad_id = " + admin_id + " ";
        sql.query(q, (err, results, fields) => {
            if(err) throw err;
            //console.log(results);
            console.log("Retrieved all subject list");
            return res.status(200).json(results);
        });
    });
};


exports.findSubjectStudent = (req, res) => {
    var details=auth.checkAuth(req);
    if(!details || details['actype']!='admin') return res.redirect(base_url);
    var unamequery="select * from admin where uname = '"+details['uname']+"'";
    var admin_id = parseInt(req.params.admin_id);
    var sub_id = parseInt(req.params.subject_id);
    sql.query(unamequery, (err, results, fields) => {
        if(err) throw err;
        if(results[0]['ad_id']!=admin_id){return res.send("Invalid admin id");}
        var q = "select registration.st_id, result.marks, result.Max_marks from registration inner join result on registration.sub_id = result.sub_id where registration.sub_id = " + sub_id + " ";
        console.log(q);
        sql.query(q, (err, results, fields) => {
            if(err) throw err;
            console.log(results);
            res.status(200).json(results);
            console.log("Retrieved all students for the subject_id :" + sub_id + " ");
        });
    });
};


exports.submitQuestionPaper = (req, res) => {
    /*body = {
        //question: [{qid, statement, op1, op2, op3, op4, ans, ad_id, sub_id, eid, Marks}]
        question: [{qid, statement, op1, op2, op3, op4, ans, marks}]
        sub_id:
        start_time:
        end_time:
        passing_marks:
       // exam: [eid, start_time, end_time, max_marks, passing_marks, sub_id]
    }*/

    /*
{
        
        "questions": [
                        {   "qid" : 5, 
                            "statement" : "ques5",
                            "op1" : "op1",
                            "op2" : "op2", 
                            "op3" : "op3", 
                            "op4" : "op4",
                            "ans" : 1,
                            "marks" : 40
                        },
                        {   "qid" : 6, 
                            "statement" : "ques6",
                            "op1" : "op1",
                            "op2" : "op2", 
                            "op3" : "op3", 
                            "op4" : "op4",
                            "ans" : 2,
                            "marks" : 40
                        },
                        {   "qid" : 7, 
                            "statement" : "ques7",
                            "op1" : "op1",
                            "op2" : "op2", 
                            "op3" : "op3", 
                            "op4" : "op4",
                            "ans" : 3,
                            "marks" : 20
                        }
                    ],
        "sub_id": 1, 
        "start_time": "2016-01-01 00:00:01",
        "end_time": "2016-01-01 00:01:01",
        "passing_marks": 35
}
    */

    var details=auth.checkAuth(req);
    if(!details || details['actype']!='admin') return res.redirect(base_url);
    var unamequery="select * from admin where uname = '"+details['uname']+"'";
    sql.query(unamequery, (err, results, fields) => {
        if(err) throw err;
        if(results[0]['ad_id']!=admin_id){return res.send("Invalid admin id");}
        // Extracting parameters
        var admin_id = parseInt(req.params.admin_id);
        var exam_id = parseInt(req.params.exam_id);
        var numberResAdded = 0;
        
        var questions = req.body.questions;
        //console.log(questions);
        var sub_id = req.body.sub_id;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var passing_marks = req.body.passing_marks;

        var query1 = "insert into question (qid, statement, op1, op2, op3, op4, ans, ad_id, sub_id, eid, Marks) values ?";
        var query2 = "insert into exam (eid, start_time, end_time, max_marks, passing_marks, sub_id) values ?"  ;

        var max_marks = 0;
        for(var i=0; i<questions.length; i++){
            max_marks += questions[i].marks; 
        }

        var values = [exam_id, start_time, end_time, max_marks, passing_marks, sub_id];
        var array = [];
        array.push(values);
        console.log(values);
        sql.query(query2, [array], (err, results, fields) => {
            if(err) throw err;
            res.status(200).json({
                affectedRows_Result: results.affectedRows
            });
            console.log("total rows inserted into question table : " + numberResAdded + " ");
        });

        values = [];
        questions.forEach(res => {
            var temp = [];
            temp.push(res.qid);
            temp.push(res.statement);
            temp.push(res.op1);
            temp.push(res.op2);
            temp.push(res.op3);
            temp.push(res.op4);
            temp.push(res.ans);
            temp.push(admin_id);
            temp.push(sub_id);
            temp.push(exam_id);
            temp.push(res.marks);
            values.push(temp);
        });

        //console.log(query1);
        sql.query(query1, [values], (err, results, fields) => {
            if(err) throw err;
            numberResAdded = results.affectedRows;
            console.log("total rows inserted into question table : " + numberResAdded + " ");
        });
    });
};