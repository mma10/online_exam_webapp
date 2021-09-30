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

export const showStudentExams = eid => dispatch => {
    const token = localStorage.getItem('token');
    axios.get(proxy + '/api/student/' + eid +'/exams/' + token)
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
            });        
       }
    });
}

export const updateCurrentExamSubId = (subId) => dispatch => {
    dispatch({
        type: 'SET_CURRENT_SUB_ID',
        payload: subId
    });
} 

export const showExamPaper = subId => dispatch => {
    const token = localStorage.getItem('token');
    axios.get(proxy + '/api/student/' + subId + '/exam/' + token)
    .then(res => {
        dispatch({
            type: 'DISPLAY_STUDENT_EXAM',
            payload: res.data
        });
        alert('YOUR EXAM BEGINS NOW');
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
            });
            alert(err.response.data.msg);
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
            alert('Exam has been sent successfully');
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

