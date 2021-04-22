const initState = {
    id: null
}

const adminReducer = (state = initState,action) => {
    switch(action.type){
        case 'CLEAR_ADMIN':
            return({
                ...state,
                id: null
            })

        default: return state;
    }

}

export default adminReducer;