import mongoose from "mongoose";
import { coordinatesSchema } from "./coordinatesDao.mjs";
import Museum from "../models/museum.mjs";

const itemsPerPage = 30;
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
  findAll: async (page = 1) => {
    const data = await MongoMuseum.find({})
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

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
  searchByName: async (name, page) => {
    const reg = new RegExp(name, "i");
    const data = await MongoMuseum.find({ name: reg })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return data.map((d) => new Museum(d));
  },
};

export { museumSchema, museumDao };
