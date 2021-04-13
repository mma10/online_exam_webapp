import axios from 'axios';

exports.getInvigilatorExams = id => dispatch => {
    axios.get('/api/invigilator/${id}/exams')
    .then(res => {
        dispatch({
            type: 'GET_INVIGILATOR_EXAMS',
            payload: res.data
        });
    })
    .catch(err => {
        dispatch({
            type: 'GET_ERROR',
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
                id: 'GET_INVIGILATOR_EXAMS_FAILED'                
            }
        });
    });
};

