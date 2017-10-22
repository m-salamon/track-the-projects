import * as types from './actionsType';
import axios from 'axios';

////////////////
// get projects
//////////////
function getProjectsSuccess(projectItems) {
    return {
        type: types.GET_PROJECTS,
        payload: projectItems
    }
}

function getProjects() {
    return async dispatch => {
        let response = await axios.get(`/api/projects/getProjectItems`);
        dispatch(getProjectsSuccess(response.data));
    }
}

////////////////
// get tasks
//////////////
function getTasksSuccess(taskItems) {
    return {
        type: types.GET_TASKS,
        payload: taskItems
    }
}

function getTasks() {
    return async dispatch => {
        let response = await axios.get(`/api/tasks/getTaskItems`);
        dispatch(getTasksSuccess(response.data));
    }
}

////////////////
// save track log start
//////////////
function saveTrackLogSuccess(saveLog) {
    return {
        type: types.SAVE_TRACK_LOG,
        saveLog
    }
}

function saveTrackLog(saveLog) {
    return async dispatch => {
        let response = await axios.post('/api/saveTrackLog/', saveLog);
        dispatch(saveTrackLogSuccess(response.data));
    }
}

////////////////
// get todays logs
//////////////
function getTrackLogSuccess(trackLog) {
    return {
        type: types.GET_TRACK_LOG,
        payload: trackLog
    }
}

function getTrackLog(tracklog) {
    console.log('track log date',tracklog)
    return async dispatch => {
        let response = await axios.get('/api/getTrackLog/', { headers: { logdate: tracklog.logDate} });
        dispatch(getTrackLogSuccess(response.data));
    }
}

////////////////
// get logs
//////////////
function editTrackLogSuccess(tracklog) {
    return {
        type: types.EDIT_TRACK_LOG,
        payload: tracklog
    }
}

function editTrackLog(tracklog) {
    return async dispatch => {
        let response = await axios.get('/api/editTrackLog/', { headers: { logId: tracklog.logId} });
        dispatch(editTrackLogSuccess(response.data));
    }
}

////////////////
// get logs
//////////////
function deleteTrackLogSuccess(deleteLog) {
    return {
        type: types.DELETE_TRACK_LOG,
        deleteLog
    }
}

function deleteTrackLog(tracklog) {
    return async dispatch => {
        let response = await axios.post('/api/deleteTrackLog', {logid: tracklog.logId});
        dispatch(deleteTrackLogSuccess(response.data));
        if (response.data.success) {
            console.log('it works')
        } 
    }
}

export {
    getProjects,
    getTasks,
    saveTrackLog,
    editTrackLog,
    getTrackLog,
    deleteTrackLog
}
