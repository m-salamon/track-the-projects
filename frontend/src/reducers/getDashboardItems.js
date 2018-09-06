import * as types from '../actions/actionsType';

export default function getDashboardItems(state = [], action) {
    switch(action.type) {
        case types.GET_DASHBOARD_ITEMS:
            return action.payload.dashboardItems  
        default:
            return state;
    }
}