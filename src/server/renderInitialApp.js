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

const createStoreForClient = async () => {
  const store = createStore(mythicPlusApp);
  const context = getContext();
  const dungeons = await models.Dungeon.getAll();
  const initialState = store.getState();

  initialState.dungeons = {
    dungeons,
    selected: {},
    keyLevel: null,
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
        <title>Mythic Plus Easy Group</title>
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