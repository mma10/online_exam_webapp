const initState = {
    id: 1,
    name: "ANUJ",
    rollNo: 20,
    class: 6,
    subjects: [
        {sub_id: 1, sub_name: "ENGLISH1", admin_name: "AKSHAY1"},
        {sub_id: 2, sub_name: "ENGLISH2", admin_name: "AKSHAY2"},
        {sub_id: 3, sub_name: "ENGLISH3", admin_name: "AKSHAY3"}
    ],
    exams: null,
    currentExam: null,
    examMsg: null,
    results: {
        years: [2018,2019,2020],
        2018: [
            {sub_id: 1, sub_name: "ENGLISH1", marks: 50, passing_marks: 30, max_marks: 100, class: 5},
            {sub_id: 2, sub_name: "ENGLISH2", marks: 70, passing_marks: 35, max_marks: 100, class: 5},
            {sub_id: 3, sub_name: "ENGLISH3", marks: 90, passing_marks: 30, max_marks: 100, class: 5},
            {sub_id: 4, sub_name: "ENGLISH4", marks: 99, passing_marks: 35, max_marks: 100, class: 5},
        ],
        2019: [
            {sub_id: 10, sub_name: "MATH1", marks: 29, passing_marks: 30, max_marks: 100, class: 6},
            {sub_id: 11, sub_name: "ENGLISH5", marks: 72, passing_marks: 30, max_marks: 100, class: 6},
            {sub_id: 12, sub_name: "SCIENCE1", marks: 40, passing_marks: 30, max_marks: 100, class: 6},
        ],
        2020: [
            {sub_id: 10, sub_name: "MATH1", marks: 46, passing_marks: 30, max_marks: 100, class: 6},
            {sub_id: 11, sub_name: "ENGLISH5", marks: 80, passing_marks: 30, max_marks: 100, class: 6},
            {sub_id: 12, sub_name: "SCIENCE", marks: 45, passing_marks: 30, max_marks: 100, class: 6},
        ]
    }   
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