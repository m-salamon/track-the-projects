import { combineReducers } from 'redux';
import saveTrackLogReducer from './saveTrackLog';
import getProjectReducer from './project';
import getTaskReducer from './task';

const appreducer = combineReducers({
    saveTrackLogReducer,
    getProjectReducer,
    getTaskReducer,
})

export default appreducer;
