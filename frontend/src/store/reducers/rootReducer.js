import authReducer from './authReducer';
import adminReducer from './adminReducer';
import studentReducer from './studentReducer';
import errorReducer from './errorReducer';
import invigilatorReducer from './invigilatorReducer';
import managementReducer from './managementReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    student: studentReducer,
    admin: adminReducer,
    invigilator: invigilatorReducer,
    management: managementReducer
});

export default rootReducer;