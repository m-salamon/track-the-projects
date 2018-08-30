import * as types from '../actions/actionsType';
var NAV_YO = 'NAV_YO'

export const toggleNavSide = (state = [], action) => {

  switch (action.type) {
    case types.NAV_SIDE:
      return action.payload
    default:
      return state;
  }
}