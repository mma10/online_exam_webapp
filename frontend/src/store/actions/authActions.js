const axios = require('axios');
const proxy = "http://localhost:4000";

export const login = (credentials) => dispatch => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:4000/api/auth/check/' + token,credentials)
    .then(res => {
        dispatch({
            type: 'LOGIN',
            payload: res.data
        });

        if(credentials.actype == "student")
            dispatch({
                type: 'GET_STUDENT_DETAILS',
                payload: res.data
            });
        else if(credentials.actype == "admin")
            dispatch({
                type: 'GET_ADMIN_DETAILS',
                payload: res.data
            });
        else if(credentials.actype == "invigilator")
            dispatch({
                type: 'GET_INVIGILATOR_DETAILS',
                payload: res.data
            });
        else if(credentials.actype == "management")
            dispatch({
                type: 'GET_MANAGEMENT_DETAILS',
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
                    id: 'LOGIN_FAILED'                
                }
            });
        }        
    })
}

export const logout = () => dispatch => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/auth/logout/' + token)
    .then(res => {
        // Remove stored token
        localStorage.removeItem('token');

        // Clear frontend data
            
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
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'LOGOUT_FAILED'                
                }
            });
        }        
    });    
}

    