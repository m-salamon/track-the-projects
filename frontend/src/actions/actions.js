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
        console.log('response data', response.data)
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
    console.log('redux getTrackLog')
    return async dispatch => {
        let response = await axios.get('/api/getTrackLog/', { headers: { logdate: tracklog.logDate} });
        dispatch(getTrackLogSuccess(response.data));
    }
}

////////////////
// edit track logs
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
// delete logs
//////////////
function deleteTrackLogSuccess(deleteLog) {
    return {
        type: types.DELETE_TRACK_LOG,
        deleteLog
    }
}

function deleteTrackLog(tracklog) {
    return async dispatch => {
        let response = await axios.post('/api/deleteTrackLog', {logid: tracklog.logId})
         dispatch(deleteTrackLogSuccess(response.data));
    }
}

////////////////
// update logs
//////////////
function updateTrackLogSuccess(updateLog) {
    return {
        type: types.UPDATE_TRACK_LOG,
        updateLog
    }
}

function updateTrackLog(updateLog) {
    console.log('updateLog',updateLog)
    return async dispatch => {
        let response = await axios.post('/api/updateTrackLog/', updateLog)
         dispatch(updateTrackLogSuccess(response.data));       
    }
}

////////////////
// manage add client
//////////////
function addClientSuccess(items) {
    return {
        type: types.ADD_CLIENT,
        items
    }
}
function addClient(items) {
    return async dispatch => {
        let response = await axios.post('/api/manage/addClient', items);
        dispatch(saveTrackLogSuccess(response.data));
    }
}

////////////////
// manage get client
//////////////
function getClientSuccess(client) {
    return {
        type: types.GET_CLIENT,
        payload: client
    }
}

function getClient() {
    return async dispatch => {
        let response = await axios.get('/api/manage/getClient');
        dispatch(getClientSuccess(response.data));
    }
}
////////////////
// delete client
//////////////
function deleteClientSuccess(items) {
    return {
        type: types.DELETE_CLIENT,
        items
    }
}
function deleteClient(items) {
    return async dispatch => {
        let response = await axios.post('/api/manage/deleteClient', items);
        dispatch(saveTrackLogSuccess(response.data));
    }
}
////////////////
// edit client
//////////////
function editClientSuccess(item) {
    return {
        type: types.EDIT_CLIENT,
        payload: item
    }
}
function editClient(item) {
    console.log(item)
    return async dispatch => {
        let response = await axios.get('/api/manage/editClient', { headers: { id: item.id} });
        console.log('res',response)
        dispatch(editClientSuccess(response.data));
    }
}

////////////////
// update item
//////////////
function updateItemSuccess(updateItem) {
    return {
        type: types.UPDATE_ITEM,
        updateItem
    }
}

function updateItem(updateItem) {
    console.log('updateItem',updateItem)
    return async dispatch => {
        let response = await axios.post('/api/manage/updateItem/', updateItem)
         dispatch(updateItemSuccess(response.data));       
    }
}


export {
    getProjects,
    getTasks,
    saveTrackLog,
    editTrackLog,
    getTrackLog,
    deleteTrackLog,
    updateTrackLog,
    addClient,
    getClient,
    deleteClient,
    editClient,
    updateItem
}
