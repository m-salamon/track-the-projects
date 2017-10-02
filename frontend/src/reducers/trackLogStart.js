import * as types from '../actions/actionsType';

export default function startTrackLogReducer(state = [], payload) {
    switch(payload.type) {
        case types.TRACK_LOG_START:
            return [...state, payload.start]    
        default:
            return state;
    }
}

export {
    startTrackLogReducer
}
