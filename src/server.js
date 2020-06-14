import express from 'express';
import mongoose from 'mongoose';

import { getContext, createHTML } from "./server/renderInitialApp";
import api from './server/api';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

mongoose
  .connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
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
    const context = getContext();
    const html = await createHTML(assets, req);
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(html);
    }
  });  


export default server;
