const initState = {
    id: null,
    name: null,
    rollNo: null,
    class: null,
    subjects: null,
    exams: null,
    currentExam: null,
    examMsg: null,
    results: null    
}

const studentReducer = (state = initState,action) => {
    switch(action.type){
        case 'GET_STUDENT_DETAILS':
            return({
                ...state,
                id: action.payload.studentId,
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

        case 'DISPLAY_STUDENT_EXAM':
            return({
                ...state,
                currentExam: action.payload
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

export default studentReducer;