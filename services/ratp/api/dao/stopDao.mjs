import mongoose from "mongoose";
import { coordinatesSchema } from "./coordinatesDao.mjs";
import Stop from "../models/stop.mjs";

const stopSchema = new mongoose.Schema({
	type: {
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
	city: {
		type: String,
		required: true,
	},
});

const MongoStop = mongoose.model("stopCollection", stopSchema);

const stopDao = {
	removeAll: async () => {
		await MongoStop.deleteMany({});
	},
	findAll: async () => {
		return (await MongoStop.find({})).map((s) => new Stop(s));
	},
	add: async (stop) => {
		try {
			const stopObject = new MongoStop({ ...stop });

      await stopObject.save();
    } catch (e) {
      console.error(e);
      return Promise.reject("Not a valid stop.");
    }
  },
  addMany: async (stops) => {
    try {
      await MongoStop.insertMany(stops);
    } catch (e) {
      console.error(e);
      return Promise.reject("Not a valid stop.");
    }
  },
  getById: async (id) => {
    try {
      return await MongoStop.findById(id);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  getByCity: async (city) => {
    try {
      return await MongoStop.find({ city });
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

export { stopSchema, stopDao };
