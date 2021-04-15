const initState = {
    id: 201,
    type: "student",
    loggedIn: true,
    name: "ANUJ",
}

const authReducer = (state = initState,action) => {
    switch(action.type){
        default: return state;
    }

}

export default authReducer;