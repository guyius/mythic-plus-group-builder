import { combineReducers } from 'redux';
import scoresReducer from './scores/reducer';

export default combineReducers({
  scores: scoresReducer
});