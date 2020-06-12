import mongoose from 'mongoose';

const dungeonSchema = new mongoose.Schema(
  {
    id: {
      type: "number",
      unique: true,
      required: true,
    },
    keystone_id: {
      type: "number",
      unique: true,
      required: true,
    },
    name: {
      type: "string",
    },
    short_name: {
      type: "string",
    },
    slug: {
      type: "string",
    },
    dungeon_name: {
      type: "string",
    },
    dungeon_slug: {
      type: "string",
    },
    time: {
      type: "number",
    },
    score: {
      type: "number",
    },
  },
);

dungeonSchema.statics.getAll = async function () {
  const user = await this.find();
  return user;
};

const Dungeon = mongoose.model('Dungeon', dungeonSchema);

export default Dungeon;
