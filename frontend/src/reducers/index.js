import { combineReducers } from 'redux';
import saveTrackLogReducer from './saveTrackLog';
import getProjectReducer from './project';
import getTaskReducer from './task';
import getClientReducer from './client'
import getTrackLogReducer from './getTrackLog';
import editTrackLogReducer from './editTrackLog';
import deleteTrackLogReducer from './deleteTrackLog';
import updateTrackLogReducer from './updateTrackLog';
import manageReducer from './manage';


const appreducer = combineReducers({
    getProjectReducer,
    getTaskReducer,
    getClientReducer,
    saveTrackLogReducer,
    getTrackLogReducer,
    editTrackLogReducer,
    deleteTrackLogReducer,
    updateTrackLogReducer,
    manageReducer,

})

export default appreducer;
