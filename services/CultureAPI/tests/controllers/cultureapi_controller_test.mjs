import { assert, should, expect } from "chai";
import supertest from "supertest";
import server from "../../server.mjs";
import { mongoose } from "mongoose";
import Artwork from "../../api/models/artwork.mjs";
import Museum from "../../api/models/museum.mjs";

const requestWithSupertest = supertest(server);

const { museumDao } = await import("../../api/dao/museumDao.mjs");
const { artworkDao } = await import("../../api/dao/artworkDao.mjs");

describe("api/culture", function () {
  before(async function () {
    await mongoose.connection.close();
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  beforeEach(async function () {
    await museumDao.removeAll();
    await artworkDao.removeAll();
  });

  after(async function () {
    await mongoose.connection.close();
  });

  describe("GET /search", function () {
    it("with empty result", async function () {
      const result = await requestWithSupertest.get("/api/culture/search");

      expect(result.status).to.be.eql(404);
    });

    it("with artworks", async function () {
      const artwork1 = new Artwork({
        id: 1,
        id_museum: "M1",
        name: "Oeuvre 1",
        author: "Auteur 1",
        type: "Peinture 1",
        size: "L: 20cm H: 36cm",
      });

      const artwork2 = new Artwork({
        id: 2,
        id_museum: "M2",
        name: "Peinture 2",
        author: "Auteur 2",
        type: "Serviette",
        size: "L: 23cm H: 23cm",
      });

      const museum1 = new Museum({
        id: 1,
        museofile: "M1",
        name: "Musée 1",
        coordinates: {
          longitude: 20,
          latitude: 20,
        },
        department: "Loire-Atlantique",
        address: "Road 1",
        url: "https://example.com",
        city: "Nantes",
      });

      const museum2 = new Museum({
        museofile: "M2",
        name: "Lusée 1",
        coordinates: {
          longitude: 20,
          latitude: 20,
        },
        department: "Pays-de-la-Loire",
        address: "Road 2",
        url: "https://example2.com",
        city: "Angers",
      });

      await artworkDao.addMany([artwork1, artwork2]);
      await museumDao.addMany([museum1, museum2]);

      const result = await requestWithSupertest.get(`/api/culture/search/pein`);

      expect(result.status).to.be.eql(200);
      expect(result.body.museums).to.be.eql([]);

      expect(result.body.artworks.length).to.be.eql(1);
      expect(result.body.artworks[0].name).to.be.eql("Peinture 2");
    });

    it("with muesums", async function () {
      const artwork1 = new Artwork({
        id: 1,
        id_museum: "M1",
        name: "Oeuvre 1",
        author: "Auteur 1",
        type: "Peinture 1",
        size: "L: 20cm H: 36cm",
      });

      const artwork2 = new Artwork({
        id: 2,
        id_museum: "M2",
        name: "Peinture 2",
        author: "Auteur 2",
        type: "Serviette",
        size: "L: 23cm H: 23cm",
      });

      const museum1 = new Museum({
        id: 1,
        museofile: "M1",
        name: "Musée 1",
        coordinates: {
          longitude: 20,
          latitude: 20,
        },
        department: "Loire-Atlantique",
        address: "Road 1",
        url: "https://example.com",
        city: "Nantes",
      });

      const museum2 = new Museum({
        museofile: "M2",
        name: "Lusée 2",
        coordinates: {
          longitude: 20,
          latitude: 20,
        },
        department: "Pays-de-la-Loire",
        address: "Road 2",
        url: "https://example2.com",
        city: "Angers",
      });

      await artworkDao.addMany([artwork1, artwork2]);
      await museumDao.addMany([museum1, museum2]);

      const result = await requestWithSupertest.get(`/api/culture/search/lus`);

      expect(result.status).to.be.eql(200);
      expect(result.body.artworks).to.be.eql([]);

      expect(result.body.museums.length).to.be.eql(1);
      expect(result.body.museums[0].name).to.be.eql("Lusée 2");
    });

    it("with both muesums and artworks", async function () {
      const artwork1 = new Artwork({
        id: 1,
        id_museum: "M1",
        name: "Oeuvre 1",
        author: "Auteur 1",
        type: "Peinture 1",
        size: "L: 20cm H: 36cm",
      });

      const artwork2 = new Artwork({
        id: 2,
        id_museum: "M2",
        name: "Peinture 2",
        author: "Auteur 2",
        type: "Serviette",
        size: "L: 23cm H: 23cm",
      });

      const museum1 = new Museum({
        id: 1,
        museofile: "M1",
        name: "Musée 1",
        coordinates: {
          longitude: 20,
          latitude: 20,
        },
        department: "Loire-Atlantique",
        address: "Road 1",
        url: "https://example.com",
        city: "Nantes",
      });

      const museum2 = new Museum({
        museofile: "M2",
        name: "Lusée 2",
        coordinates: {
          longitude: 20,
          latitude: 20,
        },
        department: "Pays-de-la-Loire",
        address: "Road 2",
        url: "https://example2.com",
        city: "Angers",
      });

      await artworkDao.addMany([artwork1, artwork2]);
      await museumDao.addMany([museum1, museum2]);

      const result = await requestWithSupertest.get(`/api/culture/search/1`);

      expect(result.status).to.be.eql(200);

      expect(result.body.artworks.length).to.be.eql(1);
      expect(result.body.artworks[0].name).to.be.eql("Oeuvre 1");

      expect(result.body.museums.length).to.be.eql(1);
      expect(result.body.museums[0].name).to.be.eql("Musée 1");
    });
  });
});
