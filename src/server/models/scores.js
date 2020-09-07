import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
    },
    score: {
      type: "number"
    }
  }
)

const scoresSchema = new mongoose.Schema(
  {
    id: {
      type: "number",
      unique: true,
      required: true,
    },
    name: {
      type: "string",
    },
    game: {
      type: "string",
    },
    imageUrl: {
      type: "string",
    },
    scores: [scoreSchema]
  },
);

scoresSchema.statics.getAll = async function () {
  const user = await this.find();
  return user;
};

const Scores = mongoose.model('Scores', scoresSchema, 'tony-hawk');

export default Scores;
