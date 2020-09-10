import express from "express";
import fetch from "node-fetch";
import models from "./models";
import bodyParser from 'body-parser';

const api = express.Router();
const baseUrl = `https://api2.bestkeystone.com/api/`;
const jsonParser = bodyParser.json()

async function fetchData(url) {
  try {
    const data = await fetch(url);
    const body = await data.json();
    return body;
  } catch (e) {
    return e;
  }  
}

api.get('/dungeons', async (req, res) => {
  const dungeons = await models.Dungeon.getAll();
  res.send({ dungeons });
});

api.get('/search', async (req, res) => {
  const url = `${baseUrl}Player/search?character=${req.query.query}`;  
  const data = await fetchData(url);
  res.send({ data });
});

api.get('/character/:id/:region', async (req, res) => { 
  const url = `${baseUrl}Player?id=${req.params.id}&region=${req.params.region}`;
  const data = await fetchData(url);
  res.send({ data });
});

api.post('/update-scores', jsonParser, (req, res) => {
  models.Scores.findOneAndUpdate({name: req.body.level}, 
    {[`scores.${req.body.player}`]: +req.body.score}, 
    {useFindAndModify: false},
    (err, doc) => {
    if (err) return res.send(500, {error: err});
    return res.send(`Succesfully updated field ${doc}.`);
  });
});

export default api;