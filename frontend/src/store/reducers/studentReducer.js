const initState = {
    studentId: null,
    name: null,
    rollNo: null,
    class: null,
    subjects: null,
    exams: null,
    results: null
}

const studentReducer = (state = initState,action) => {
    switch(action.type){
        default: return state;
    }

}

module.exports = studentReducer;