import * as actions from "./actions";

const initialState = {
  player: {},
  selected: {},
  loading: false,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_PLAYER:
      return { 
        ...state, 
        loading: true, 
        selected: action.selected 
      };
    case actions.GET_PLAYER_SUCCEED:
      return { ...state, player: action.player, loading: false };
    case actions.GET_PLAYER_FAILED:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}
