const axios = require('axios');
const proxy = "http://localhost:4000";

export const showAdminSubjects = adminId => dispatch => {
    console.log(adminId, "In showAdminSubjects action");
    const token = localStorage.getItem('token');
    axios.get(proxy + '/api/admin/' + adminId + '/subjects/' + token)
        .then(res=> {
            dispatch({
                type: 'GET_ADMIN_SUBJECTS',
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
                        id: 'GET_ADMIN_SUBJECTS_FAILED'
                    }
                });
            }
        }); 
}

export const showSubjectStudents = (adminId, subjectId) => dispatch => {
    console.log(subjectId, "In showSubjectStudents action");
    const token = localStorage.getItem('token');
    axios.get(proxy + '/api/admin/' + adminId + '/' + subjectId + '/students/' + token)
        .then(res => {
            dispatch({
                type: 'GET_SUBJECT_STUDENTS',
                payload: res.data
            });
        })
        .catch(err => {
            if(err.response){
                dispatch({
                    type: 'GET_ERROR',
                    payload : {
                        msg: err.response.data.msg,
                        status: err.response.status,
                        id: 'GET_SUBJECT_STUDENTS_FAILED'
                    }
                });
            }
        });

}

export const submitExamForm = (adminId, examForm) => dispatch => {
    console.log("In create exam action");
    const token = localStorage.getItem('token');
    axios.post(proxy + '/api/admin/' + adminId + '/exam/' + token, examForm)
        .then(res => {
            if(res.status == 200){
                dispatch({
                    type: 'SUBMIT_EXAM_FORM',
                    payload: {
                        msg: "EXAM SUCCESSFULLY CREATED"
                    }
                });
                alert("Exam form submitted successfully");
            }
        })
        .catch(err => {
            if(err.response){
                dispatch({
                    type: 'GET_ERROR',
                    payload: {
                        msg: err.response.data.msg,
                        status: err.response.status,
                        id: 'EXAM_CREATION_FAILED' 
                    }
                });
            }
        });
}