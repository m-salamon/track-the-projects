import { combineReducers } from 'redux';
import saveTrackLogReducer from './saveTrackLog';
import getProjectReducer from './project';
import getTaskReducer from './task';
import getTrackLogReducer from './getTrackLog';
import editTrackLogReducer from './editTrackLog';
import deleteTrackLogReducer from './deleteTrackLog';
import updateTrackLogReducer from './updateTrackLog';

const appreducer = combineReducers({
    getProjectReducer,
    getTaskReducer,
    saveTrackLogReducer,
    getTrackLogReducer,
    editTrackLogReducer,
    deleteTrackLogReducer,
    updateTrackLogReducer
})

export default appreducer;
