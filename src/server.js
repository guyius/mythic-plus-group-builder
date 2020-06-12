import express from 'express';
import React from 'react';
import mongoose from 'mongoose';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import { createStoreForClient } from "./server/getDerivedState";
import App from "./App";
import api from './server/api';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(result => {
    console.log(
      `Connected to Mongo DB, URL =>  ${process.env.MONGO_URL}`
    );
  })
  .catch(error => {
    console.log("Cant connect to Mongo DB", error);
  });

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use('/api', api)
  .get('/*', async (req, res) => {
    const { store, context, initialState } = await createStoreForClient();
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
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
      );
    }
  });  


export default server;
