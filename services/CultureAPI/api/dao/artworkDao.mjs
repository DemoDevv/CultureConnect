import mongoose from "mongoose";
import Artwork from "../models/artwork.mjs";

const itemsPerPage = 30;
const artworkSchema = new mongoose.Schema({
  id_museum: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
});

const MongoArtwork = mongoose.model("artworkCollection", artworkSchema);

const artworkDao = {
  isValid: (artwork) => {
    return new MongoArtwork({ ...artwork }).validateSync() === undefined;
  },
  findAll: async (page = 1) => {
    const data = await MongoArtwork.find({})
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return data.map((artwork) => new Artwork(artwork));
  },
  add: async (artwork) => {
    try {
      const mongoObject = new MongoArtwork({ ...artwork });

      await mongoObject.save();
    } catch (e) {
      console.error(e);
      return Promise.reject("Not a valid artwork");
    }
  },
  addMany: async (artworks) => {
    try {
      await MongoArtwork.insertMany(artworks);
    } catch (e) {
      console.error(e);
      return Promise.reject("Not a valid artwork");
    }
  },
  removeAll: async () => {
    await MongoArtwork.deleteMany({});
  },
  getById: async (id) => {
    return await MongoArtwork.findOne({
      id,
    });
  },
  getByMuseofile: async (museofile, page = 1) => {
    const data = await MongoArtwork.find({
      id_museum: museofile,
    })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return data;
  },
};

export { artworkSchema, artworkDao };
