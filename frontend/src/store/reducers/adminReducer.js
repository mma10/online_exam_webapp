const initState = {
    id: 1,
    name: "ADMIN1",
    subjects: [],
    message: null
}

const adminReducer = (state = initState,action) => {
    switch(action.type){
        case 'GET_ADMIN_DETAILS':
            return({
                ...state,
                id: action.payload.adminId,
                name: action.payload.name,
            });
        case 'GET_ADMIN_SUBJECTS':
            return({
                ...state,
                subjects: action.payload
            });
        case 'GET_SUBJECT_STUDENTS':
            return({
                ...state,
                students: action.payload
            });
        case 'SUBMIT_EXAM_FORM':
            return({
                ...state,

            });
        case 'CLEAR_ADMIN':
            return({
                ...state,
                id: null
            })

        default: return state;
    }

}

export default adminReducer;