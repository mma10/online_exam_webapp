import authReducer from './authReducer'
import adminReducer from './adminReducer';
import studentReducer from './studentReducer'
import errorReducer from './errorReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    student: studentReducer,
    admin: adminReducer,
});

export default rootReducer;