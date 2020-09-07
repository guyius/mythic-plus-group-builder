import * as actions from './actions'

const initialState = {
  levels: {},
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_SCORE:
        return { ...state, loading: true }
    case actions.SCORE_SUCCEED:
      return { 
        ...state, 
        [levels[action.level][action.scores]]: action.scores,
        loading: false 
      }
    case actions.SCORE_FAILED:
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}