import authReducer from './authReducer'
import adminReducer from './adminReducer';
import studentReducer from './studentReducer'
import invigilatorReducer from './invigilatorReducer'
import errorReducer from './errorReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    student: studentReducer,
    admin: adminReducer,
    invigilator: invigilatorReducer
});

export default rootReducer;