var sql = require('../models/db');
const auth=require('./authController.js');
const base_url='/api/auth/';

exports.findInvigilatorExams = (req,res) => {
    // Check authenticity

    var details=auth.checkAuth(req);
    if(!details) return res.redirect(base_url);
    if(details['actype']!='invigilator'){
        return res.status(404).json({
            msg :"You Don't Have Student Account"
        });
    }   
    
    // Check if inv_id is valid

    var unamequery="select * from invigilator where uname = '"+details['uname']+"'";
    var id = parseInt(req.params.invigilator_id);
    sql.query(unamequery, (err, results, fields) => {
        if(err){
            sql=require('../models/db');
            console.log(err);
            return res.status(400).json({
                msg :"Error"
            });
        }
        if(results[0]['inv_id']!=id){
            return res.status(404).json({
                msg :"Invalid Invigilator Id"
            });
        }
        
        // Send the exams of the respective invigilator
        
        var query = "SELECT * FROM exam where eid IN (SELECT * from examinv WHERE inv_id = ?)";
        sql.query(query,[id],(err,result) => {
            if(err){
                sql=require('../models/db');
                console.log(err);
                return res.status(400).json({
                    msg :"Error"
                });
            }
            res.status(200).json(result);
        });
    });
}