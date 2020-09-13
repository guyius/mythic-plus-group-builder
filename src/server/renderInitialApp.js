import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';

import models from "./models";
import mythicPlusApp from '../store/rootReducer';
import App from "../App";

export const getContext = () => {
  return {};
};

const buildGameLevels = (levelsList) => {
  const firstGameLevels = levelsList.filter(level => level.game === 'Tony Hawk 1').sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;  
  });
  const secondGameLevels = levelsList.filter(level => level.game === 'Tony Hawk 2').sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;  
  });
  return [...firstGameLevels, ...secondGameLevels].reduce((obj, item) => {
    return {
      ...obj,
      [item.name]: {scores: item.scores, imageUrl: item.imageUrl}
    };
  }, {});
}

const createStoreForClient = async () => {
  const store = createStore(mythicPlusApp);
  const context = getContext();
  const levelsRaw = await models.Scores.getAll();  
  const levels = buildGameLevels(levelsRaw);  
  const initialState = store.getState();

  initialState.scores = {
    levels,
    loading: false,
    error: '',
  };

  return { store, context, initialState };
};

const createMarkup = async (req) => {
  const { store, context, initialState } = await createStoreForClient();
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  return {markup, initialState};
};

export const createHTML = async (assets, req) => {
  const { markup, initialState } = await createMarkup(req);

  return `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Tony Hawk High Scores</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
</html>`
};