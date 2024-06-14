import { artworkDao } from "../dao/artworkDao.mjs";

const artworkController = {
  findById: async (id) => await artworkDao.getById(museofile),
  findByMuseofile: async (museofile, page) =>
    await artworkDao.getByMuseofile(museofile, page),
};

export default artworkController;
