import axios from "axios";
const proxy = "http://localhost:4000";

// Student Actions

export const getAllStudents = () => dispatch => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/management/students/' + token)
    .then(res => {
        dispatch({
            type: 'GET_ALL_STUDENTS',
            payload: res.data
        })
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'GET_ALL_STUDENTS_FAILED'                
                }
            });
    });
}

export const addStudent = (newStudent) => dispatch => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:4000/api/management/student/' + token,newStudent)
    .then(res => {
        // dispatch({
        //     type: 'ADD_STUDENT',
        //     payload: 
        // })
        alert(res.data.msg);
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'ADD_STUDENT_FAILED'                
                }
            });
    });
}

export const deleteStudent = id => dispatch => {
    const token = localStorage.getItem('token');
    axios.delete('http://localhost:4000/api/management/' + id + '/student/' + token)
    .then(res => {
        // dispatch()
        alert(res.data.msg);
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'DELETE_STUDENT_FAILED'                
                }
            });
    });
}

// Invigilator Actions

export const getAllInvigilators = () => dispatch => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/management/invigilators/' + token)
    .then(res => {
        dispatch({
            type: 'GET_ALL_INVIGILATORS',
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'GET_ALL_INV_FAILED'                
                }
            });
    });
}

export const addInvigilator = (credentials) => dispatch => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:4000/api/management/invigilator/' + token,credentials)
    .then(res => {
        // dispatch()
        alert(res.data.msg);
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'ADD_INV_FAILED'                
                }
            });
    });
} 

export const deleteInvigilator = id => dispatch => {
    const token = localStorage.getItem('token');
    axios.delete('http://localhost:4000/api/management/' + id + '/invigilator/' + token)
    .then(res => {
        // dispatch()
        alert(res.data.msg)
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'DELETE_INV_FAILED'                
                }
            });
    });
} 

export const addInvigilatorExam = (id,eid) => dispatch => {
    const token = localStorage.getItem('token');
    axios.put('http://localhost:4000/api/management/' + id + '/' + eid + '/invigilator/' + token)
    .then(res => {
        // dispatch()
        alert(res.data.msg);
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'ADD_INV_EXAM_FAILED'                
                }
            });
    });
}

export const removeInvigilatorExam = (id,eid) => dispatch => {
    const token = localStorage.getItem('token');
    axios.delete('http://localhost:4000/api/management/' + id + '/' + eid + '/invigilator/' + token)
    .then(res => {
        // dispatch
        alert(res.data.msg);
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'DELETE_INV_EXAM_FAILED'                
                }
            });
    });
}

// Admin Actions

export const findAllAdmins = () => dispatch => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/management/admins/' + token)
    .then(res => {
        dispatch({
            type: 'GET_ALL_ADMINS',
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'GET_ALL_ADMINS_FAILED'                
                }
            });
    });
}


export const deleteAdmin = (id) => dispatch => {
    const token = localStorage.getItem('token');
    axios.delete('http://localhost:4000/api/management/' + id + '/admin/' + token)
    .then(res => {
        // dispatch()
        alert(res.data.msg)
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'DELETE_ADMIN_FAILED'                
                }
            });
    });
}

export const addAdmin = (newAdmin) => dispatch => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:4000/api/management/admin/' + token,newAdmin)
    .then(res => {
        // dispatch()
        alert(res.data.msg);
    })
    .catch(err => {
        if(err.response)
            dispatch({
                type: 'GET_ERROR',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'ADD_ADMIN_FAILED'                
                }
            });
    });

}


