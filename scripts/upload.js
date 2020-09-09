// Quick uploading to DB when needed to convert json to DB.
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://guyius:Chopa27112g@ds333768.mlab.com:33768/high-scores'

const LevelList = [
  {
    name: "Burnside",
    game: "Tony Hawk 1",
    imageUrl: "https://i.ibb.co/J795fmz/Chicago.jpg",
    scores: {
      "guy": 124,
      "idan": 12414
    }
  },
  {
    name: "Chicago",
    game: "Tony Hawk 1",
    imageUrl: "https://i.ibb.co/J795fmz/Chicago.jpg",
    scores: {
      "guy": 14500,
      "idan": 6000
    }
  },
  {
    name: "Downhill Jam",
    game: "Tony Hawk 1",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 734634,
      "idan": 7474578
    }
  },
  {
    name: "Downtown",
    game: "Tony Hawk 1",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Mall",
    game: "Tony Hawk 1",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 65002,
      "idan": 74855
    }
  },
  {
    name: "Roswell",
    game: "Tony Hawk 1",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "School",
    game: "Tony Hawk 1",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Streets",
    game: "Tony Hawk 1",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Warehouse",
    game: "Tony Hawk 1",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Bullring",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Chooper Drop",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Hangar",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Hoffman Factory",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Marseille",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "New York City",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Philadelphia",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Rooftops",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "School 2",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Skatestreet",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Skate Heaven",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  },
  {
    name: "Venice",
    game: "Tony Hawk 2",
    imageUrl: "https://i.ibb.co/sRVs6KL/Downhill-Jam.jpg",
    scores: {
      "guy": 0,
      "idan": 0
    }
  }
];

mongo.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
    console.error(err)
    return;
  }
  console.log('connected');
  const db = client.db('high-scores');
  const collection = db.collection('tony-hawk');
  collection.insertMany(LevelList, (err, result) => {
    if (err) {
      console.log(err);     
    } else {
      console.log(result);
    }
    return;
  })
});
