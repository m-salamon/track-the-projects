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
// get clients
//////////////
function getClients() {
    return async dispatch => {
        let response = await axios.get(`/api/clients/getClientItems`);
        dispatch({ type: types.GET_CLIENTS, payload: response.data });
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
    return async dispatch => {
        let response = await axios.get('/api/getTrackLog/', { headers: { logdate: tracklog.logDate } });
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
        let response = await axios.get('/api/editTrackLog/', { headers: { logId: tracklog.logId } });
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
        let response = await axios.post('/api/deleteTrackLog', { logid: tracklog.logId })
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
    return async dispatch => {
        let response = await axios.post('/api/updateTrackLog/', updateLog)
        dispatch(updateTrackLogSuccess(response.data));
    }
}

////////////////
// add client
//////////////
function addItemSuccess(item) {
    return {
        type: types.ADD_ITEM,
        item
    }
}
function addItem(item) {
    return async dispatch => {
        let response = await axios.post('/api/manage/addItem', item);
        dispatch(addItemSuccess(response.data));
    }
}

////////////////
// get item
//////////////
function getItem(item) {
    return async dispatch => {
        let response = await axios.get('/api/manage/getItem', { headers: { action: item.action } });
        dispatch({ type: types.GET_ITEM, payload: response.data });
    }
}
////////////////
// delete item
//////////////
function deleteItemSuccess(items) {
    return {
        type: types.DELETE_ITEM,
        items
    }
}
function deleteItem(items) {
    return async dispatch => {
        let response = await axios.post('/api/manage/deleteItem', items);
        dispatch(deleteItemSuccess(response.data));
    }
}
////////////////
// edit item
//////////////
function editItem(item) {
    return async dispatch => {
        let response = await axios.get('/api/manage/editItem', { headers: { id: item.id, action: item.action } });
        dispatch({ type: types.EDIT_ITEM, payload: response.data });
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
    return async dispatch => {
        let response = await axios.post('/api/manage/updateItem', updateItem)
        dispatch(updateItemSuccess(response.data));
    }
}


export {
    getProjects,
    getTasks,
    getClients,
    saveTrackLog,
    editTrackLog,
    getTrackLog,
    deleteTrackLog,
    updateTrackLog,
    addItem,
    getItem,
    deleteItem,
    editItem,
    updateItem
}
