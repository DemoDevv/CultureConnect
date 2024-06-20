import { artworkDao } from "../dao/artworkDao.mjs";

const artworkController = {
  findById: async (id) => await artworkDao.getById(id),
  findByMuseofile: async (museofile, page) =>
    await artworkDao.getByMuseofile(museofile, page),
};

export default artworkController;
