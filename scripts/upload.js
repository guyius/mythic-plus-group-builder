// Quick uploading to DB when needed to convert json to DB.
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://guyius:Chopa27112g@ds351807.mlab.com:51807/mythic-plus';

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
