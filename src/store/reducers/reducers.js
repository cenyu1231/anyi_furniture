import { combineReducers } from 'redux';
import city from './city';
import user from './user';

// 合并后
const reducers = combineReducers({
    user,city
})

export default reducers;