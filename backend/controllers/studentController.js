var sql = require('../models/db');
const auth=require('./authController.js');
const base_url='/api/auth/';

exports.findStudentSubjects = (req,res) => {
    // Take student_id and find all corresponding registered subjects
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='student'){
        return res.status(200).json({
            msg :"You Don't Have Student Account"
        });
    }
    var unamequery="select * from student where uname = '"+details['uname']+"'";
    
    var id = parseInt(req.params.student_id);
    sql.query(unamequery, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        if(results[0]['st_id']!=id){
            return res.status(404).json({
                msg :"Invalid Student Id"
            });
        }
        var query = "SELECT s.sub_id, s.name as sub_name, a.name as admin_name FROM subject s, adminsubject a_s, admin a WHERE s.sub_id = a_s.sub_id and a_s.ad_id = a.ad_id and s.sub_id = ANY(SELECT sub_id FROM registration WHERE st_id = ?)";
        sql.query(query,[id],(err, result) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                return res.status(400).json({
                    msg: "Failed to get res"
                });
            }
            return res.status(200).json(result);
        });
    });
};

exports.findStudentExams = (req,res) => {
    // Take student_id and find all corresponding exams
    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='student'){
        return res.status(404).json({
            msg :"You Don't Have Student Account"
        });
    }
    var unamequery="select * from student where uname = '"+details['uname']+"'";

    var id = parseInt(req.params.student_id);
    sql.query(unamequery, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        if(results[0]['st_id']!=id){
            return res.status(404).json({
                msg :"Invalid Student Id"
            });
        }

        var query = "SELECT * FROM exam NATURAL JOIN subject WHERE  sub_id = ANY(SELECT sub_id FROM registration WHERE st_id = ?)";
        sql.query(query,[id],(err, result) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                return res.status(400).json({
                    msg: "Failed to get exams"
                });
            }
            return res.status(200).json(result);
        }); 
    });
};

exports.findExamPaper = (req,res) => {
    // Chech authenticity

    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='student'){
        return res.status(404).json({
            msg :"You Don't Have Student Account"
        });
    }

    // Check if examId is valid

    var examId = parseInt(req.params.exam_id);
    var query1 = "SELECT * FROM exam WHERE eid = ?";    
    sql.query(query1,[examId],(err, result) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        if(result.length <= 0){
            return res.status(404).json({
                msg :"Invalid Exam Id"
            });
        }
        
        // Check if the student have previously submitted the exam 

        var query1 = "SELECT * FROM student NATURAL JOIN result WHERE username = ? AND eid = ? AND year = 2021" // Set current year
        sql.query(query1,[[details['username'],examId]],(err,result) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                return res.status(400).json({
                    msg :"Error"
                });
            }
            if(result.length > 0)
                res.status(404).json({
                    msg: "YOU HAVE ALREADY SUBMITTED THE EXAM"
                });
        })

        // Get and send the examPaper
        
        var examDetails = result;
        var query = "SELECT * from question WHERE eid = ?"
        sql.query(query,[examId],(err,result) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                return res.status(400).json({
                    msg :"Error"
                });
            }
            res.status(200).json({
                examDetails,
                questions: result
            });
        });
    });
}

exports.submitStudentExam = (req,res) => {
    // body = {
    //     responses: [{qid, res, qMarks}]
    //     class:
    //     sub_id:
    //     year:
    //     max_marks:
    // }

    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='student'){
        return res.status(404).json({
            msg :"You Don't Have Student Account"
        });
    }
    var unamequery="select * from student where uname = '"+details['uname']+"'";

    sql.query(unamequery, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        if(results[0]['st_id']!=id){
            return res.status(404).json({
                msg :"Invalid Student Id"
            });
        }
        // Extract student and exam id
        var studentId = parseInt(req.params.student_id);
        var examId = parseInt(req.params.exam_id);

        // Add the responses to the database

        var numberResAdded = 0;
        var responses = req.body.responses;
        var body = req.body;
        var query = "INSERT INTO res (st_id,eid,qid,res) VALUES ?";
        var values = [];
        responses.forEach(res => {
            var temp = [];
            temp.push(parseInt(studentId));
            temp.push(parseInt(examId));
            temp.push(res.qid);
            temp.push(res.res);
            values.push(temp);
        });

        sql.query(query,[values],(err, result) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                res.status(400).json({
                    msg: "Failed to insert the data into res"
                });
            }
            numberResAdded = result.affectedRows;
        });

        // Get the correct responses of the exam

        query = "SELECT qid, ans FROM question WHERE eid = ?";
        sql.query(query,[examId],(err,result) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                res.status(400).json({
                    msg: "Failed to get corrected answers"
                });
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
                if(responses[i].res == correctAns[i].ans)
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
                    sql=require('../models/db');
                    console.log(err);
                    res.status(400).json({
                        msg: "Failed to insert into Results"
                    });
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
    if(!details) return res.redirect(base_url);
    if(details['actype']!='student'){
        return res.status(404).json({
            msg :"You Don't Have Student Account"
        });
    }
    var unamequery="select * from student where uname = '"+details['uname']+"'";

    var id = parseInt(req.params.student_id);
    sql.query(unamequery, (err, results, fields) => {
        if(err) {
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        if(results[0]['st_id']!=id){
            return res.status(404).json({
                msg :"Invalid Student Id"
            });
        }
        var query = "SELECT * FROM result WHERE st_id = ?";
        sql.query(query,[id],(err,result) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                res.status(400).json({
                    msg: "Falied to get results"
                });
            }  

            // Sort the results yearwise                       
            result.sort(function(a,b){
                if(a.year <= b.year)
                    return -1;
                else
                    return 1;
            });
            
            // Parse the results yearwise into object
            var resultObject = {
                years: []
            };
            var year = 2000;
            console.log(result);
            result.forEach(rs => {
                if(rs.year != year){
                    year = rs.year;
                    resultObject.years.push(year);
                    resultObject[year] = []
                }
                resultObject[year].push(rs);
            });
            
            res.status(200).json(resultObject);
        });
    });

};