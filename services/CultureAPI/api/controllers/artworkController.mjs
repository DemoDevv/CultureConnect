import { artworkDao } from "../dao/artworkDao.mjs";

const artworkController = {
  findById: async (id) => await artworkDao.getById(id),
  findByMuseofile: async (museofile, page) =>
    await artworkDao.getByMuseofile(museofile, page),
  findByName: async (name, page) => await artworkDao.searchByName(name, page),
};

export default artworkController;
