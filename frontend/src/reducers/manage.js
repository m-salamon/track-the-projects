import * as types from '../actions/actionsType';

export default function manageReducer(state = [], action) {

    switch (action.type) {
        case types.GET_ITEM:
            return action.payload
        case types.EDIT_ITEM:
            return action.payload
        case types.DELETE_ITEM:
            return [...state, action]
        case types.ADD_ITEM:
            return [...state, action]
        default:
            return state;
    }
}

export {
    manageReducer
}
