import { museumDao } from "../dao/museumDao.mjs";

const museumController = {
	findByMuseofile: async (museofile) =>
		await museumDao.getByMuseofile(museofile),
	findByName: async (name, page) => await museumDao.searchByName(name, page);
};

export default museumController;
