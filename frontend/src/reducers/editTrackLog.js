import * as types from '../actions/actionsType';

export default function editTrackLogReducer(state = [], action) {
    console.log('editTrackLogReducer ',action.payload)
    switch(action.type) {
        case types.EDIT_TRACK_LOG:
            return action.payload.trackLog  
        default:
            return state;
    }
}

export {
    editTrackLogReducer
}
