import { assert, should, expect } from "chai";
import supertest from "supertest";
import server from "../../server.mjs";
import { mongoose } from "mongoose";
import Artwork from "../../api/models/artwork.mjs";
import Museum from "../../api/models/museum.mjs";

const requestWithSupertest = supertest(server);

const museum1 = new Museum({
  id: 1,
  name: "Museum1",
  museofile: "M1",
  coordinates: {
    longitude: 20,
    latitude: 20,
  },
  department: "Loire-Atlantique",
  address: "Road 1",
  url: "https://example.com",
  city: "Nantes",
});

const artwork1 = new Artwork({
  id: 10,
  id_museum: "M1",
  name: "A1",
  author: "Author A",
  type: "Peinture",
  size: "L: 20cm H: 36cm",
});

const { museumDao } = await import("../../api/dao/museumDao.mjs");
const { artworkDao } = await import("../../api/dao/artworkDao.mjs");

describe("GET api/culture/museums", function () {
  before(async () => {
    await mongoose.connection.close();
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  beforeEach(async () => {
    await museumDao.removeAll();
    await artworkDao.removeAll();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("GET /", async () => {
    const response = await requestWithSupertest.get("/api/culture/museums");

    expect(response.status).to.eql(200);
  });

  describe("GET /:museofile", async () => {
    it("with not found museum", async () => {
      const response = await requestWithSupertest.get(
        "/api/culture/museums/M1"
      );

      expect(response.status).to.eql(404);
    });

    it("with found museum", async () => {
      await museumDao.add(museum1);

      const response = await requestWithSupertest.get(
        "/api/culture/museums/M1"
      );

      expect(response.status).to.eql(200);
      expect(response.body.name).to.eql("Museum1");
    });
  });

  describe("GET /:museofile/artworks", async () => {
    it("with no museum", async () => {
      const response = await requestWithSupertest.get(
        "/api/culture/museums/artworks/M1"
      );

      expect(response.status).to.eql(200);
      expect(response.body).to.be.deep.equal([]);
    });

    it("with not found museum", async () => {
      await museumDao.add(museum1);
      await artworkDao.add(artwork1);

      const response = await requestWithSupertest.get(
        `/api/culture/museums/artworks/M2`
      );

      expect(response.status).to.eql(200);
      expect(response.body).to.eql([]);
    });

    it("with found museum", async () => {
      await museumDao.add(museum1);
      await artworkDao.add(artwork1);

      const response = await requestWithSupertest.get(
        `/api/culture/museums/artworks/M1`
      );

      expect(response.status).to.eql(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.eql(1);
      expect(response.body[0].name).to.eql("A1");
    });
  });
});
