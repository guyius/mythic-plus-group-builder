import * as actions from './actions'
import { dungeonsData } from '../../components/DungeonSelection/constants';

const initialState = {
  dungeons: dungeonsData,
  selected: {},
  keyLevel: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_DUNGEONS:
      return { ...state, dungeons: action.dungeons }
    case actions.SELECT_DUNGEON:
        return { ...state, selected: action.dungeon }
    case actions.SET_KEY_LEVEL:
      return { ...state, keyLevel: action.keyLevel }
    default:
      return state
  }
}