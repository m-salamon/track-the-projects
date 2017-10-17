import * as types from '../actions/actionsType';

export default function getTrackLogReducer(state = [], action) {
    switch(action.type) {
        case types.GET_TRACK_LOG:
            return action.payload.trackLog  
        default:
            return state;
    }
}

export {
    getTrackLogReducer
}
