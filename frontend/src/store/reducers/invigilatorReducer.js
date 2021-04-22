const initState = {
    id: 1,
    name: "inv1",
    exams: [
        {"sub_id":1,"eid":1,"start_time":"2015-12-31T18:30:01.000Z","end_time":"2015-12-31T21:30:01.000Z","max_marks":100,"passing_marks":35,"name":"maths 1","class":null},
        {"sub_id":2,"eid":2,"start_time":"2016-01-01T18:30:01.000Z","end_time":"2016-01-01T21:30:01.000Z","max_marks":100,"passing_marks":40,"name":"maths 2","class":null},
        {"sub_id":13,"eid":8,"start_time":"2014-12-31T18:30:01.000Z","end_time":"2014-12-31T18:31:01.000Z","max_marks":100,"passing_marks":35,"name":"english 3","class":null}
    ]
};

const invigilatorReducer = (state = initState,action) => {
    switch(action.type){
        case 'GET_INVIGILATOR_EXAMS':
            return({
                ...state,
                exams: action.payload
            });

        case 'CLEAR_ERROR': 
            return({
                ...state,
                id: null,
                name: null,
                exams: null
            });

        default: return(state)
    }        
};


export default invigilatorReducer;