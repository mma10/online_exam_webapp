const axios = require('axios');
const proxy = "http://localhost:4000";

exports.login = (credentials) => dispatch => {
    const token = localStorage.getItem('token');
    axios.post('${proxy}/api/auth/check/${token}',credentials)
    .then(res => {
        dispatch({
            type: 'LOGIN',
            payload: res.data
        });
        dispatch({
            type: 'GET_STUDENT_DETAILS',
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
    })
}

exports.logout = () => dispatch => {
    dispatch({
        type: 'LOGOUT'
    });
    dispatch({
        type: 'CLEAR_STUDENT'
    });
    dispatch({
        type: 'CLEAR_ADMIN'
    });
    dispatch({
        type: 'CLEAR_INVIGILATOR'
    });
    dispatch({
        type: 'CLEAR_MANAGEMENT'
    });
    dispatch({
        type: 'CLEAR_ERROR'
    });
}