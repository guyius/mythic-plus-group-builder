import { createStore } from 'redux';

import models from "./models";
import mythicPlusApp from '../store/rootReducer';

export const createStoreForClient = async () => {
  const store = createStore(mythicPlusApp);
  const context = {};
  const dungeons = await models.Dungeon.getAll();
  const initialState = store.getState();

  initialState.dungeons = {
    dungeons,
    selected: {},
    keyLevel: null,
  };

  return { store, context, initialState };
};