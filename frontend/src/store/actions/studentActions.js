const axios = require('axios');
const proxy = "http://localhost:4000";

export const showStudentSubjects = id => dispatch => {
    console.log(id,"In showStudent action");
    const token = localStorage.getItem('token');
    axios.get(proxy + '/api/student/' + id + '/subjects/' + token)
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

export const showStudentExams = id => dispatch => {
    const token = localStorage.getItem('token');
    axios.get(proxy + '/api/student/' + id +'/exams/' + token)
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

export const showExamPaper = examId => dispatch => {
    const token = localStorage.getItem('token');
    axios.get(proxy + '/api/student/' + examId + '/exam/' + token)
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

export const submitStudentExam = (examId,studentId,examBody) => dispatch => {
    const token = localStorage.getItem('token');
    axios.post(proxy + '/api/student/' + examId  + '/' + studentId + '/exam/' + token,examBody)
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

export const getStudentResults = id => dispatch => {
    const token = localStorage.getItem('token');
    axios.get(proxy + '/api/student/' + id + '/results/' + token)
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

