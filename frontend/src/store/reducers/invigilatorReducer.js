const initState = {
    inv_id: null,
    inv_name: null,
    exams: null
};

const invigilatorReducer = (state = initState,action) => {
    switch(action.type){
        case 'GET_INVIGILATOR_EXAMS':
            return({
                ...state,
                exams: action.payload
            });

        default: return(state)
    }        
};


export default invigilatorReducer;