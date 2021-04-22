const initState = {
    id: null,
    name: null,
    students: null,
    admins: null,
    exams: null
};

const invigilatorReducer = (state = initState,action) => {
    switch(action.type){
        case 'CLEAR_MANAGEMENT':
            return({
                ...state,
                id: null,
                name: null,
                students: null,
                admins: null,
                exams: null
            });

        default: return(state)
    }        
};


export default invigilatorReducer;