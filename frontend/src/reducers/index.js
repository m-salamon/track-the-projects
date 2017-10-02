import { combineReducers } from 'redux';
import trackLogStart from './trackLogStart';
import getProjectReducer from './project';

const appreducer = combineReducers({
    trackLogStart,
    getProjectReducer
})

export default appreducer;
