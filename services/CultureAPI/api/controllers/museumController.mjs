import { museumDao } from "../dao/museumDao.mjs";

const museumController = {
	findByMuseofile: async (museofile) =>
		await museumDao.getByMuseofile(museofile),
};

export default museumController;
