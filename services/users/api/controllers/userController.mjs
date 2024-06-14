import userDao from "../dao/userDao.mjs";
import { comparePassword } from "../helpers/hash.mjs";
import { generateAccessToken } from "../helpers/jwt.mjs";

const userController = {
  register: async (user) => {
    if (await userDao.findUserByEmail(user.email)) {
      return Promise.reject("User already exists");
    }

    await userDao.createUser(user);

    const token = generateAccessToken(user);
    return token;
  },
  login: async (user) => {
    const foundUser = await userDao.findUserByEmail(user.email);

    if (!foundUser || !comparePassword(user.password, foundUser.password)) {
      return Promise.reject("Invalid credentials");
    }

    const token = generateAccessToken(user);
    return token;
  },
  addFavorite: async () => {
    // TODO
  },
};

export default userController;
