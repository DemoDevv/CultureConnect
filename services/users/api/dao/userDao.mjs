import mongoose from "mongoose";
import { hashPassword } from "../helpers/hash.mjs";

const userSchema = new mongoose.Schema({
  pseudonyme: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoris: {
    type: [String],
    of: String,
    required: false,
  },
});

const MongoUser = mongoose.model("userCollection", userSchema);

const userDao = {
  findUserById: async (id) => {
    return await MongoUser.findById(id).exec();
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
  addFavorite: async (email, artwork_id) => {
    const user = await MongoUser.findOne({
      email,
    });

    if (!user) return Promise.reject("User not found");

    if (user.favoris.includes(artwork_id)) {
      return Promise.reject("Artwork already added to favorites");
    }

    user.favoris.push(artwork_id);

    await user.save();
  },
  removeFavorite: async (email, artwork_id) => {
    const user = await MongoUser.findOne({
      email,
    });

    if (!user) return Promise.reject("User not found");

    if (!user.favoris.includes(artwork_id)) {
      return Promise.reject("Artwork not in your favorites");
    }

    user.favoris = user.favoris.filter((f) => f !== artwork_id);

    await user.save();
  },
};

export default userDao;
