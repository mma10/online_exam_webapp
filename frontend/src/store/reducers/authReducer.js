const initState = {
    id: 201,
    type: "invigilator",
    loggedIn: true,
    name: "ANUJ",
}

const authReducer = (state = initState,action) => {
    switch(action.type){
        case 'LOGIN':
            return({
                id: action.payload.id,
                type: action.payload.type,
                loggedIn: true,
                name: action.payload.name
            });

        case 'LOGOUT':
            return({
                ...state,
                id: null,
                type: null,
                loggedIn: false,
                name: null
            });

        default: return state;
    }

}

export default authReducer;