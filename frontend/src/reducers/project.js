import * as types from '../actions/actionsType';

export default function getProjectReducer(state = [], action) {
    
    switch(action.type) {
        case types.GET_PROJECTS:
            return action.payload.projectItems      
        default:
            return state;
    }
}

export {
    getProjectReducer
}
