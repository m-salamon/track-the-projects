import * as types from '../actions/actionsType';

export default function deleteTrackLogReducer(state = [], payload) {
    switch(payload.type) {
        case types.DELETE_TRACK_LOG:
            return [...state, payload.deleteLog]    
        default:
            return state;
    }
}

export {
    deleteTrackLogReducer
}
