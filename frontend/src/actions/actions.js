import * as types from './actionsType';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

////////////////
// get projects
//////////////
function getProjects() {
    return async dispatch => {
        let response = await axios.get(`/api/projects/getProjectItems`);
        dispatch({ type: types.GET_PROJECTS, payload: response.data });
    }
}

////////////////
// get tasks
//////////////
function getTasks() {
    return async dispatch => {
        let response = await axios.get(`/api/tasks/getTaskItems`);
        dispatch({ type: types.GET_TASKS, payload: response.data });
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
function getTrackLog(tracklog) {
    return async dispatch => {
        let response = await axios.get('/api/getTrackLog/', { headers: { logdate: tracklog.logDate } });
        dispatch({type: types.GET_TRACK_LOG, payload: response.data});
    }
}

////////////////
// get dahsboard items
//////////////
export function getDashboardItems(filters) {
    return async dispatch => {
        let response = await axios.post(`/api/manage/getDashboardItems/`, filters );

        response.data.getItems.map(item => {
            item.rate = !_.isEmpty(item.taskRate) ? item.taskRate : !_.isEmpty(item.userRate) ? item.userRate : !_.isEmpty(item.projectRate) ? item.projectRate : 0
            item.rateType = !_.isEmpty(item.taskRate) ? 'task' : !_.isEmpty(item.userRate) ? 'user' : !_.isEmpty(item.projectRate) ? 'project' : ''
            item.total = (moment.duration(item.duration).asMinutes() / 60 * item.rate).toFixed(2)
        })
        var durations = response.data.getItems.map(i => i.duration)
        const totalDurations = durations.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(durations[0]))
        const totalRate = response.data.getItems.reduce((pre, cur) => {
            pre.total = (Number(pre.total) + Number(cur.total)).toFixed(2)
            return pre
        }, { total: 0 })
        response.data.getItems.map(i => _.merge(i, { totalDuration: moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss"), totalRate: totalRate.total }))
        dispatch({ type: types.GET_ITEM, payload: response.data });
    }
}

////////////////
// edit track logs
//////////////
function editTrackLog(tracklog) {
    return async dispatch => {
        let response = await axios.get('/api/editTrackLog/', { headers: { logId: tracklog.logId } });
        dispatch({type: types.EDIT_TRACK_LOG, payload:response.data});
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

////////////////
// navside
//////////////
export function toggleNavSide(bool) {
    return { type: types.NAV_SIDE, payload: bool }
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
    updateItem,
}
