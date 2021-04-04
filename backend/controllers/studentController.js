// const students = require('../models/studentModel');
// const register = require('../models/registerModel');

const sql = require('../models/db');
const auth=require('./authController.js');
const base_url='/api/auth/';

exports.findStudentSubjects = (req,res) => {
    // Take student_id and find all corresponding registered subjects
    var details=auth.checkAuth(req);
    if(!details || details['actype']!='student') return res.redirect(base_url);
    var unamequery="select * from student where uname = '"+details['uname']+"'";
    
    var id = parseInt(req.params.student_id);
    sql.query(unamequery, (err, results, fields) => {
        if(err) throw err;
        if(results[0]['st_id']!=id){return res.send("Invalid Student Id");}
        var query = "SELECT sub_id, name FROM subject WHERE sub_id = ANY(SELECT sub_id FROM registration WHERE st_id = ?)";
        sql.query(query,[id],(err, result) => {
            if(err){
                res.status(404).json({
                    msg: "Failed to get response"
                });
                throw err;
            }
            res.status(200).json(result);
        });
    });
};

exports.findStudentExams = (req,res) => {
    // Take student_id and find all corresponding exams
    var details=auth.checkAuth(req);
    if(!details || details['actype']!='student') return res.redirect(base_url);
    var unamequery="select * from student where uname = '"+details['uname']+"'";

    var id = parseInt(req.params.student_id);
    sql.query(unamequery, (err, results, fields) => {
        if(err) throw err;
        if(results[0]['st_id']!=id){return res.send("Invalid Student Id");}
        var query = "SELECT * FROM exam WHERE sub_id = ANY(SELECT sub_id FROM registration WHERE st_id = ?)";
        sql.query(query,[id],(err, result) => {
            if(err){
                res.status(404).json({
                    msg: "Failed to get exams"
                });
            throw err;
            }
            res.status(200).json(result);
        }); 
    });
};

exports.submitStudentExam = (req,res) => {
    // body = {
    //     responses: [{qid, response, qMarks}]
    //     class:
    //     sub_id:
    //     year:
    //     max_marks:
    // }

    var details=auth.checkAuth(req);
    if(!details || details['actype']!='student') return res.redirect(base_url);
    var unamequery="select * from student where uname = '"+details['uname']+"'";

    sql.query(unamequery, (err, results, fields) => {
        if(err) throw err;
        if(results[0]['st_id']!=id){return res.send("Invalid Student Id");}
        // Extract student and exam id
        var studentId = parseInt(req.params.student_id);
        var examId = parseInt(req.params.exam_id);

        // Add the responses to the database

        var numberResAdded = 0;
        var responses = req.body.responses;
        var body = req.body;
        var query = "INSERT INTO response (st_id,eid,qid,response) VALUES ?";
        var values = [];
        responses.forEach(res => {
            var temp = [];
            temp.push(parseInt(studentId));
            temp.push(parseInt(examId));
            temp.push(res.qid);
            temp.push(res.response);
            values.push(temp);
        });

        sql.query(query,[values],(err, result) => {
            if(err){
                res.status(404).json({
                    msg: "Failed to insert the data into Response"
                });
                throw err;
            }
            numberResAdded = result.affectedRows;
        });

        // Get the correct responses of the exam

        query = "SELECT qid, ans FROM question WHERE eid = ?";
        sql.query(query,[examId],(err,result) => {
            if(err){
                res.status(404).json({
                    msg: "Failed to get corrected answers"
                });
                throw err;
            }
            var correctAns = result;
            console.log(correctAns, " correct ans ");

            // Sort arrays on increasing order of qid

            correctAns.sort(function(a,b){
                if(a.qid <= b.qid)
                    return -1;
                else    
                    return 1;
            });

            // Calculate the result of the exam

            var marks = 0;
            var maxMarks = body.max_marks;
            for(var i=0; i<responses.length; i++){
                if(responses[i].response == correctAns[i].ans)
                    marks += responses[i].qMarks;
            }

            console.log(marks + "/" + maxMarks);

            query = "INSERT INTO result VALUES ?";
            values = [marks,body.class,studentId,body.sub_id,body.year,maxMarks];
            var array = [];
            array.push(values);
            console.log(values);
            sql.query(query,[array],(err,result) => {
                if(err){
                    res.status(404).json({
                        msg: "Failed to insert into Results"
                    });
                    throw err;
                }
                res.status(200).json({
                    affectedRows_Result: result.affectedRows
                });
            });
        });
    });

};

exports.findStudentResults = (req,res) => {
    // Find the results of the student
    var details=auth.checkAuth(req);
    if(!details || details['actype']!='student') return res.redirect(base_url);
    var unamequery="select * from student where uname = '"+details['uname']+"'";

    var id = parseInt(req.params.student_id);
    sql.query(unamequery, (err, results, fields) => {
        if(err) throw err;
        if(results[0]['st_id']!=id){return res.send("Invalid Student Id");}
        var query = "SELECT * FROM result WHERE st_id = ?";
        sql.query(query,[id],(err,result) => {
            if(err){
                res.status(404).json({
                    msg: "Falied to get results"
                });
                throw err;
            }
            res.status(200).json(result);
        });
    });

};