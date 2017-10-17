import { combineReducers } from 'redux';
import saveTrackLogReducer from './saveTrackLog';
import getProjectReducer from './project';
import getTaskReducer from './task';
import getTrackLogReducer from './getTrackLog';

const appreducer = combineReducers({
    getProjectReducer,
    getTaskReducer,
    saveTrackLogReducer,
    getTrackLogReducer
})

export default appreducer;
