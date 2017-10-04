import * as types from '../actions/actionsType';

export default function saveTrackLogReducer(state = [], payload) {
    switch(payload.type) {
        case types.SAVE_TRACK_LOG:
            return [...state, payload.saveLog]    
        default:
            return state;
    }
}

export {
    saveTrackLogReducer
}
