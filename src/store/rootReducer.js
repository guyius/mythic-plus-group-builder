import { combineReducers } from 'redux';
import searchReducer from './search/reducer';
import playerReducer from './player/reducer';
import dungeonsReducer from './dungeons/reducer';
import scoresReducer from './scores/reducer';

export default combineReducers({
  search: searchReducer,
  player: playerReducer,
  dungeons: dungeonsReducer,
  scores: scoresReducer
});