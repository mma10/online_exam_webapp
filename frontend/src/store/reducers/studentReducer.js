const initState = {
    studentId: null,
    name: null,
    rollNo: null,
    class: null,
    subjects: null,
    exams: null,
    examMsg: null,
    results: null    
}

const studentReducer = (state = initState,action) => {
    switch(action.type){
        case 'GET_STUDENT_DETAILS':
            return({
                ...state,
                studentId: action.payload.studentId,
                name: action.payload.name,
                rollNo: action.payload.rollNo,
                class: action.payload.class
            });
        
        case 'GET_STUDENT_SUBJECTS':
            return({
                ...state,
                subjects: action.payload
            });

        case 'GET_STUDENT_EXAMS':
            return({
                ...state,
                exams: action.payload
            });

        case 'SUBMIT_STUDENT_EXAM':
            return({
                ...state,
                examMsg: action.payload.msg
            });

        case 'GET_STUDENT_RESULTS':
            return({
                ...state,
                results: action.payload
            });

        default: return state;
    }

}

module.exports = studentReducer;