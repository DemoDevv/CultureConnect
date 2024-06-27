import mongoose from "mongoose";
import { hashPassword } from "../helpers/hash.mjs";
import User from "../models/user.mjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  pseudonyme: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
      isAsync: false,
    },
  },
  password: {
    type: String,
    required: true,
  },
  favoris: {
    type: [Object],
    of: String,
    required: false,
  },
});

const MongoUser = mongoose.model("userCollection", userSchema);

const userDao = {
  removeAll: async () => {
    await MongoUser.deleteMany({});
  },
  findAll: async () => {
    return await MongoUser.find({});
  },
  findUserById: async (id) => {
    try {
      return await MongoUser.findById(id).exec();
    } catch (e) {
      return null;
    }
  },
  findUserByEmail: async (email) => {
    return await MongoUser.findOne({ email: email }).exec();
  },
  createUser: async (user) => {
    try {
      const mongoObject = new MongoUser({
        ...user,
        password: hashPassword(user.password),
      });

      await mongoObject.save();
    } catch (e) {
      console.error(e);
      return Promise.reject("Not a valid user");
    }
  },
  updateUser: async (user) => {
    try {
      await MongoUser.findByIdAndUpdate(user._id, user).exec();
    } catch (e) {
      console.error(e);
      return Promise.reject("Not a valid user");
    }
  },
  getFavorites: async (email) => {
    const user = await MongoUser.findOne({
      email,
    });

    if (!user) return Promise.reject("User not found");

    return user.favoris;
  },
  addFavorite: async (email, artwork) => {
    const user = await MongoUser.findOne({
      email,
    });

    if (!user) return Promise.reject("User not found");

    if (user.favoris.map((f) => f._id).includes(artwork._id)) {
      return Promise.reject("Artwork already added to favorites");
    }

    user.favoris.push(artwork);

    await user.save();
  },
  removeFavorite: async (email, artwork_id) => {
    const user = await MongoUser.findOne({
      email,
    });

    if (!user) return Promise.reject("User not found");

    if (!user.favoris.map((f) => f._id).includes(artwork_id)) {
      return Promise.reject("Artwork not in your favorites");
    }

    user.favoris = user.favoris.filter((f) => f._id !== artwork_id);

    await user.save();
  },
};

export default userDao;
