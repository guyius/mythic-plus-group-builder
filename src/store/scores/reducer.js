import * as actions from './actions'

const initialState = {
  levels: {},
  loading: "",
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_SCORE:
        return { 
          ...state, 
          levels: {
            ...state.levels,
            [action.level]: {
            ...state.levels[action.level],
            scores: {
              ...state.levels[action.level].scores,
              [action.player]: action.newScore
            }
          }
          },
          loading: action.level,
          error: ''
        }
    case actions.SCORE_SUCCEED:
      return { ...state, loading: "", error: '' }
    case actions.SCORE_FAILED:
      return { ...state, error: action.error, loading: "" }
    default:
      return state
  }
}