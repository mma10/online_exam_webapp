const initState = {
    msg: null,
    status: null,
    id: null
}

const errorReducer = (state = initState,action) => {
    switch(action.type){
        case 'GET_ERROR':
            return({
                ...action.payload
            });
    
        case 'CLEAR_ERROR':
            return({
                msg: null,
                status: null,
                id: null
            });

        default: return state;
    }

}

export default errorReducer;