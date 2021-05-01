const initState = {
    id: null,
    name: null,
    rollNo: null,
    class: null,
    subjects: null
        // {sub_id: 1, sub_name: "ENGLISH1", admin_name: "AKSHAY1"},
        // {sub_id: 2, sub_name: "ENGLISH2", admin_name: "AKSHAY2"},
        // {sub_id: 3, sub_name: "ENGLISH3", admin_name: "AKSHAY3"}
    ,
    exams: null
        // {"sub_id":1,"eid":1,"start_time":"2015-12-31T18:30:01.000Z","end_time":"2015-12-31T21:30:01.000Z","max_marks":100,"passing_marks":35,"name":"maths 1","class":null},
        // {"sub_id":2,"eid":2,"start_time":"2016-01-01T18:30:01.000Z","end_time":"2016-01-01T21:30:01.000Z","max_marks":100,"passing_marks":40,"name":"maths 2","class":null},
        // {"sub_id":3,"eid":3,"start_time":"2016-01-02T18:30:01.000Z","end_time":"2016-01-02T21:30:01.000Z","max_marks":100,"passing_marks":30,"name":"maths 3","class":null}
    ,
    currentExam: [],
        // examDetails: {
        //     sub_id: 1, name: "ENGLISH1", max_marks: 100, passing_marks: 35, invigilator: "AKASH 1", end_time: "2021/04/30 18:26:00"
        // },
        // questions: [
        //     { qid: 1, statement: "statement 1", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10},
        //     { qid: 2, statement: "statement 2", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10},
        //     { qid: 3, statement: "statement 3", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10},
        //     { qid: 4, statement: "statement 4", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10},
        //     { qid: 5, statement: "statement 5", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10},
        //     { qid: 6, statement: "statement 6", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10},
        //     { qid: 7, statement: "statement 7", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10},
        //     { qid: 8, statement: "statement 8", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10},
        //     { qid: 9, statement: "statement 9", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10},
        //     { qid: 10, statement: "statement 10", op1: "abcd", op2: "apple", op3: "mango", op4: "banana", marks: 10}
        // ]
    questions: [],    
    currentExamSubId: null,
    results: null
        // years: [2018,2019,2020],
        // 2018: [
        //     {sub_id: 1, sub_name: "ENGLISH1", marks: 50, passing_marks: 30, max_marks: 100, class: 5},
        //     {sub_id: 2, sub_name: "ENGLISH2", marks: 70, passing_marks: 35, max_marks: 100, class: 5},
        //     {sub_id: 3, sub_name: "ENGLISH3", marks: 90, passing_marks: 30, max_marks: 100, class: 5},
        //     {sub_id: 4, sub_name: "ENGLISH4", marks: 99, passing_marks: 35, max_marks: 100, class: 5},
        // ],
        // 2019: [
        //     {sub_id: 10, sub_name: "MATH1", marks: 29, passing_marks: 30, max_marks: 100, class: 6},
        //     {sub_id: 11, sub_name: "ENGLISH5", marks: 72, passing_marks: 30, max_marks: 100, class: 6},
        //     {sub_id: 12, sub_name: "SCIENCE1", marks: 40, passing_marks: 30, max_marks: 100, class: 6},
        // ],
        // 2020: [
        //     {sub_id: 10, sub_name: "MATH1", marks: 46, passing_marks: 30, max_marks: 100, class: 6},
        //     {sub_id: 11, sub_name: "ENGLISH5", marks: 80, passing_marks: 30, max_marks: 100, class: 6},
        //     {sub_id: 12, sub_name: "SCIENCE", marks: 45, passing_marks: 30, max_marks: 100, class: 6},
        // ]
    
}

const studentReducer = (state = initState,action) => {
    switch(action.type){
        case 'GET_STUDENT_DETAILS':
            return({
                ...state,
                id: action.payload.st_id,
                name: action.payload.sname,
                rollNo: action.payload.st_id,
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
                currentExam: action.payload.currentExam,
                questions: action.payload.questions
            });
        
        case 'SET_CURRENT_SUB_ID':
            return({
                ...state,
                currentExamSubId: action.payload
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

        case 'CLEAR_STUDENT':
            return{
                ...state,
                id: null,
                name: null,
                rollNo: null,
                class: null,
                subjects: null,
                exams: null,
                currentExam: null,
                exmMsg: null,
                results: null
            }

        default: return state;
    }

}

export default studentReducer;