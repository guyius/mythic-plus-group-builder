export const SET_DUNGEONS = 'SET_DUNGEONS';
export const SELECT_DUNGEON = 'SELECT_DUNGEON';
export const SET_KEY_LEVEL = 'SET_KEY_LEVEL';

export const setDungeons = (dungeons) => {
  return {
    type: SET_DUNGEONS,
    dungeons
  }
}

export const selectDungeon = (dungeon) => {
  return {
    type: SELECT_DUNGEON,
    dungeon
  }
}

export const setKeyLevel = (keyLevel) => {
  return {
    type: SET_KEY_LEVEL,
    keyLevel
  }
}