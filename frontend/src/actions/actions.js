import * as types from './actionsType';
import axios from 'axios';


function getProjectsSuccess(projectItems) {
    return {
        type: types.GET_PROJECTS,
        payload: projectItems
    }
}

function getProjects() {
    //console.log('getting item ', teamId);
    return async dispatch => {
        let response = await axios.get(`/api/projects/getProjectItems`);
        dispatch(getProjectsSuccess(response.data));
    }
}

function addTrackLogStart(start) {
    return {
        type: types.TRACK_LOG_START,
        start
    }
}

function saveTrackLogStart(start) {
    return async dispatch => {
        let response = await axios.post('/start', start);
        dispatch(addTrackLogStart(response.data));
    }
}


export {
    saveTrackLogStart,
    getProjects
}
