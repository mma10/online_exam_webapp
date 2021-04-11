const axios = require('axios');

exports.showStudentSubjects = id => dispatch => {
    axios.get('/api/student/${id}/subjects')
    .then(res => {
        dispatch({
            type: 'GET_STUDENT_SUBJECTS',
            payload: res.data
        });
    })
    .catch(err => {
        dispatch({
            type: 'GET_ERROR',
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
                id: 'GET_STUDENT_SUBJECTS_FAILED'                
            }
        });
    });
}

exports.showStudentExams = id => dispatch => {
    axios.get('/api/student/${id}/exams')
    .then(res => {
        dispatch({
            type: 'GET_STUDENT_EXAMS',
            payload: res.data
        });
    })
    .catch(res => {
        dispatch({
            type: 'GET_ERROR',
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
                id: 'GET_STUDENT_EXAMS_FAILED'                
            }
        })
    });
}

exports.submitStudentExam = (examId,studentId,examBody) => dipatch => {
    axios.post('/api/student/${examId}/${studentId}/exam',examBody)
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
        dispatch({
            type: 'GET_ERROR',
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
                id: 'SUBMIT_STUDENT_EXAM_FAILED'                
            }
        })
    })
}

exports.showStudentResults = id => dispatch => {
    axios.get('/api/student/${id}/results')
    .then(res => {
        dispatch({
            type: 'GET_STUDENT_RESULTS',
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: 'GET_ERROR',
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
                id: 'GET_STUDENT_RESULTS_FAILED'                
            }
        })
    });
}

