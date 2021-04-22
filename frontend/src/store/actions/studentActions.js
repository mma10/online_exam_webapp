const axios = require('axios');
const proxy = "http://localhost:4000";

const request = {
    headers: {
        
    }
}

exports.showStudentSubjects = id => dispatch => {
    console.log(id,"In showStudent action");
    axios.get(proxy + '/api/student/' + id + '/subjects',request)
    .then(res => {
        dispatch({
            type: 'GET_STUDENT_SUBJECTS',
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'GET_STUDENT_SUBJECTS_FAILED'                
                }
            });
        }        
    });
}

exports.showStudentExams = id => dispatch => {
    axios.get(proxy + '/api/student/' + id +'/exams',request)
    .then(res => {
        dispatch({
            type: 'GET_STUDENT_EXAMS',
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response){
            dispatch({
            type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'GET_STUDENT_EXAMS_FAILED'                
                }
            })

       }
            });
}

exports.showExamPaper = examId => dispatch => {
    axios.get(proxy + '/api/student/' + examId + '/exam',request)
    .then(res => {
        dispatch({
            type: 'DISPLAY_STUDENT_EXAM',
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response){
            dispatch({
            type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'DISPLAY_STUDENT_EXAM_FAILED'                
                }
            })

       }
            })
}

exports.submitStudentExam = (examId,studentId,examBody) => dispatch => {
    axios.post(proxy + '/api/student/' + examId  + '/' + studentId + '/exam',examBody,request)
    .then(res => {
        if(res.status == 200){
            dispatch({
                type: 'SUBMIT_STUDENT_EXAM',
                payload: {
                    msg: "YOUR EXAM HAVE SUCCESSFULLY BEEN SUBMITTED"
                }
            });
        }
    })
    .catch(err => {
        if(err.response){
            dispatch({
            type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'SUBMIT_STUDENT_EXAM_FAILED'                
                }
            })

       }
            })
}

exports.getStudentResults = id => dispatch => {
    axios.get(proxy + '/api/student/' + id + '/results',request)
    .then(res => {
        dispatch({
            type: 'GET_STUDENT_RESULTS',
            payload: res.data
        })
    })
    .catch(err => {
        if(err.response){
            dispatch({
            type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'GET_STUDENT_RESULTS_FAILED'                
                }
            })

       }
            });
}

