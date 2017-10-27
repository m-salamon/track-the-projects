import * as types from '../actions/actionsType';

export default function updateTrackLogReducer(state = [], payload) {
    switch(payload.type) {
        case types.UPDATE_TRACK_LOG:
            return [...state, payload.updateLog]    
        default:
            return state;
    }
}

export {
    updateTrackLogReducer
}

