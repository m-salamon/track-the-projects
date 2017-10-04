import * as types from '../actions/actionsType';

export default function getTaskReducer(state = [], action) {
    
    switch(action.type) {
        case types.GET_TASKS:
            return action.payload.taskItems      
        default:
            return state;
    }
}

export {
    getTaskReducer
}
