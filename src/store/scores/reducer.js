import * as actions from './actions'

const initialState = {
  levels: {},
  loading: false,
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
          loading: true,
          error: ''
        }
    case actions.SCORE_SUCCEED:
      return { ...state, loading: false, error: '' }
    case actions.SCORE_FAILED:
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}