import * as types from '../actions/actionsType';

export default function manageReducer(state = [], action) {

    switch(action.type) {
        case types.GET_CLIENT:
            return action.payload      
        default:
            return state;
    }
}

export {
    manageReducer
}
