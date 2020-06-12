// Quick uploading to DB when needed to convert json to DB.
const mongo = require('mongodb').MongoClient;
const url = process.env.MONGO_URL;

const json = [];

mongo.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
    console.error(err)
    return;
  }
  console.log('connected');
  const db = client.db('mythic-plus');
  const collection = db.collection('dungeons');
  collection.insertMany(json, (err, result) => {
    if (err) {
      console.log(err);     
    } else {
      console.log(result);
    }
    return;
  })
});
