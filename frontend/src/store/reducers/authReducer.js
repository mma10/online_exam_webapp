const initState = {
    id: null,
    type: null,
    loggedIn: false,
    name: null
}

const authReducer = (state = initState,action) => {
    switch(action.type){
        case 'LOGIN':
            if(action.payload.type == "student")
                return({
                    id: action.payload.id,
                    type: action.payload.type,
                    loggedIn: true,
                    name: action.payload.name
                });
            else if(action.payload.type == "admin")
                 return({
                    id: action.payload.ad_id,
                    type: action.payload.type,
                    loggedIn: true,
                    name: action.payload.name
                });
            else if(action.payload.type == "invigilator")
                 return({
                    id: action.payload.inv_id,
                    type: action.payload.type,
                    loggedIn: true,
                    name: action.payload.name
                });
            else if(action.payload.type == "management")
                 return({
                    id: 1,
                    type: action.payload.type,
                    loggedIn: true,
                    name: "Management"
                });
            else    
                return(state);

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