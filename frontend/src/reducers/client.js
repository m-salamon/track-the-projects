import * as types from '../actions/actionsType';

export default function getClientReducer(state = [], action) {
    
    switch(action.type) {
        case types.GET_CLIENTS:
            return action.payload.clientItems      
        default:
            return state;
    }
}

export {
    getClientReducer
}
