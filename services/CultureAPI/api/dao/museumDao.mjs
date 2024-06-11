import mongoose from "mongoose";
import { coordinatesSchema } from "./coordinatesDao.mjs";
import Museum from "../models/museum.mjs";

const museumSchema = new mongoose.Schema({
  museofile: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    type: coordinatesSchema,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
});

const MongoMuseum = mongoose.model("museumCollection", museumSchema);

const museumDao = {
  findAll: async () => {
    const data = await MongoMuseum.find({});

    return data.map((museum) => new Museum(museum));
  },
  add: async (museum) => {
    try {
      const mongoObject = new MongoMuseum({ ...museum });

      await mongoObject.save();
    } catch (e) {
      console.error(e);
      return Promise.reject("Not a valid museum");
    }
  },
  addMany: async (museums) => {
    try {
      await MongoMuseum.insertMany(museums);
    } catch (e) {
      console.error(e);
      return Promise.reject("Not a valid museum");
    }
  },
  removeAll: async () => {
    await MongoMuseum.deleteMany({});
  },
  getByMuseofile: async (museofile) => {
    return await MongoMuseum.findOne({
      museofile,
    });
  },
};

export { museumSchema, museumDao };
