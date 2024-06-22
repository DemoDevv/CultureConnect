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
	favorites: async (email) => await userDao.getFavorites(email),
	addFavorite: async (email, artwork_id) =>
		await userDao.addFavorite(email, artwork_id),
	removeFavorite: async (email, artwork_id) =>
		await userDao.removeFavorite(email, artwork_id),
};

export default userController;
