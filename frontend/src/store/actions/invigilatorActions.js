import axios from 'axios';
const proxy = "http://localhost:4000";

const getInvigilatorExams = id => dispatch => {
    axios.get('${proxy}/api/invigilator/${id}/exams')
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

export default getInvigilatorExams;

