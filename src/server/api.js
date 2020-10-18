import express from "express";
import fetch from "node-fetch";
import models from "./models";
import bodyParser from 'body-parser';

const api = express.Router();
const jsonParser = bodyParser.json()

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