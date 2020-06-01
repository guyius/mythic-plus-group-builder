import * as actions from './actions'

const initialState = {
  query: "",
  results: [],
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.DO_SEARCH:
      return { ...state, query: action.query, loading: true }
    case actions.SEARCH_SUCCEED:
      return { ...state, 
        results: action.results,
        loading: false 
    }
    case actions.SEARCH_FAILED:
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}