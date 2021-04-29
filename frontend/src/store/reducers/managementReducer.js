const initState = {
    id: 1,
    name: "MANAGEMENT",
    students: [
        {id: 1, name: "A", class: 1, batch: 2020},
        {id: 2, name: "B", class: 1, batch: 2020},
        {id: 3, name: "C", class: 2, batch: 2019},
        {id: 4, name: "D", class: 2, batch: 2019},
        {id: 5, name: "E", class: 2, batch: 2019},
        {id: 6, name: "F", class: 3, batch: 2018},
    ],
    admins: null,
    exams: null,
    invigilators: [
        {id: 1, name: "A"},
        {id: 2, name: "B"},
        {id: 3, name: "C"},
        {id: 4, name: "D"},
        {id: 5, name: "E"},
        {id: 6, name: "F"},
    ]
};

const invigilatorReducer = (state = initState,action) => {
    switch(action.type){
        case 'GET_INVIGILATOR_DETAILS':
            return({
                ...state,
                id: 1,
                name: "Management"
            });
            
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