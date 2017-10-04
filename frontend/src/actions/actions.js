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


export {
    saveTrackLog,
    getProjects,
    getTasks
}
