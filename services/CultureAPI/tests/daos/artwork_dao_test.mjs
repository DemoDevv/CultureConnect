import { assert, should, expect } from "chai";
import { mongoose } from "mongoose";
import { artworkDao } from "../../api/dao/artworkDao.mjs";
import { museumDao } from "../../api/dao/museumDao.mjs";
import Museum from "../../api/models/museum.mjs";
import Artwork from "../../api/models/artwork.mjs";

describe("Artwork DAO", function () {
  before(async () => {
    await mongoose.connection.close();
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  beforeEach(async () => {
    await artworkDao.removeAll();
  });

  describe("isValid", function () {
    it("invalid", async function () {
      const artwork = new Artwork({
        id: 1,
        id_museum: "M1",
        author: "Auteur 1",
        type: "Peinture",
        size: "L: 20cm H: 36cm",
      });

      expect(await artworkDao.isValid(artwork)).to.be.false;
    });

    it("valid", async function () {
      const artwork = new Artwork({
        id: 1,
        id_museum: "M1",
        name: "Artwork 1",
        author: "Auteur 1",
        type: "Peinture",
        size: "L: 20cm H: 36cm",
      });

      expect(await artworkDao.isValid(artwork)).to.be.true;
    });
  });

  describe("findAll", function () {
    it("empty result", async function () {
      expect(await artworkDao.findAll()).to.be.an("array").that.is.empty;
    });

    it("with artworks", async function () {
      const artwork1 = new Artwork({
        id: 1,
        id_museum: "M1",
        name: "Artwork 1",
        author: "Auteur 1",
        type: "Peinture",
        size: "L: 20cm H: 36cm",
      });

      const artwork2 = new Artwork({
        id: 2,
        id_museum: "M2",
        name: "Artwork 2",
        author: "Auteur 2",
        type: "Serviette",
        size: "L: 23cm H: 23cm",
      });

      await artworkDao.addMany([artwork1, artwork2]);

      const result = await artworkDao.findAll();

      expect(result.map((m) => m.name)).to.have.deep.members([
        "Artwork 1",
        "Artwork 2",
      ]);
    });
  });

  describe("add", function () {
    it("with invalid data", async function () {
      const artwork = new Artwork({
        id: 1,
        id_museum: "M1",
        name: 1,
        author: "Auteur 1",
        type: "Peinture",
        size: "L: 20cm H: 36cm",
      });

      try {
        await artworkDao.add(artwork);
      } catch (e) {
        expect(e).to.be.equal("Not a valid artwork");
      }
    });

    it("with valid data", async function () {
      const artwork = new Artwork({
        id: 1,
        id_museum: "M1",
        name: "Artwork 1",
        author: "Auteur 1",
        type: "Peinture",
        size: "L: 20cm H: 36cm",
      });

      await artworkDao.add(artwork);

      const artworks = await artworkDao.findAll();

      expect(artworks[0].name).to.be.equal("Artwork 1");
    });
  });

  describe("addMany", function () {
    it("with invalid data", async function () {
      const artwork1 = new Artwork({
        id: 1,
        id_museum: "M1",
        author: "Auteur 1",
        type: "Peinture",
        size: "L: 20cm H: 36cm",
      });

      const artwork2 = new Artwork({
        id: 2,
        name: "Artwork 2",
        author: "Auteur 2",
        type: "Serviette",
        size: "L: 23cm H: 23cm",
      });

      try {
        await artworkDao.addMany([artwork1, artwork2]);
      } catch (e) {
        expect(e).to.be.equal("Not a valid artwork");
      }
    });

    it("with valid data", async function () {
      const artwork1 = new Artwork({
        id: 1,
        id_museum: "M1",
        name: "Artwork 1",
        author: "Auteur 1",
        type: "Peinture",
        size: "L: 20cm H: 36cm",
      });

      const artwork2 = new Artwork({
        id: 2,
        id_museum: "M2",
        name: "Artwork 2",
        author: "Auteur 2",
        type: "Serviette",
        size: "L: 23cm H: 23cm",
      });

      await artworkDao.addMany([artwork1, artwork2]);

      const artworks = await artworkDao.findAll();

      expect(artworks.length).to.be.equal(2);
      expect(artworks[1].name).to.be.equal("Artwork 2");
    });
  });

  it("removeAll removes all artworks", async function () {
    const artwork1 = new Artwork({
      id: 1,
      id_museum: "M1",
      name: "Artwork 1",
      author: "Auteur 1",
      type: "Peinture",
      size: "L: 20cm H: 36cm",
    });

    const artwork2 = new Artwork({
      id: 2,
      id_museum: "M2",
      name: "Artwork 2",
      author: "Auteur 2",
      type: "Serviette",
      size: "L: 23cm H: 23cm",
    });

    await artworkDao.addMany([artwork1, artwork2]);

    const beforeArtworks = await artworkDao.findAll();
    expect(beforeArtworks.length).to.be.equal(2);

    await artworkDao.removeAll();

    const afterAtworks = await artworkDao.findAll();
    expect(afterAtworks.length).to.be.equal(0);
  });

  describe("getById", function () {
    it("artwork not found", async function () {
      const result = await artworkDao.getById("A1");

      expect(result).to.be.null;
    });

    it("artwork found", async function () {
      const artwork = new Artwork({
        id_museum: "M1",
        name: "Artwork 1",
        author: "Auteur 1",
        type: "Peinture",
        size: "L: 20cm H: 36cm",
      });

      await artworkDao.add(artwork);
      const artworkId = (await artworkDao.findAll())[0].id;

      const result = await artworkDao.getById(artworkId);

      expect(result.name).to.be.eql("Artwork 1");
    });
  });

  describe("getByMuseofile", function () {
    it("with no result", async function () {
      const result = await artworkDao.getByMuseofile("M1");

      expect(result).to.be.an("array");
      expect(result.length).to.be.eql(0);
    });

    it("with results", async function () {
      const museum1 = new Museum({
        id: 1,
        museofile: "M1",
        name: "Museum1",
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
        id: 1,
        id_museum: "M1",
        name: "Artwork 1",
        author: "Auteur 1",
        type: "Peinture",
        size: "L: 20cm H: 36cm",
      });

      const artwork2 = new Artwork({
        id: 2,
        id_museum: "M2",
        name: "Artwork 2",
        author: "Auteur 2",
        type: "Serviette",
        size: "L: 23cm H: 23cm",
      });

      await museumDao.add(museum1);
      await artworkDao.addMany([artwork1, artwork2]);

      const result = await artworkDao.getByMuseofile("M1");

      expect(result).to.be.an("array");
      expect(result.length).to.be.eql(1);
      expect(result[0].name).to.be.eql("Artwork 1");
    });
  });

  describe("searchByName", function () {
    it("empty result", async function () {
      const result = await artworkDao.searchByName("test");

      expect(result).to.be.an("array");
      expect(result.length).to.be.eql(0);
    });

    it("with a result", async function () {
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

      await artworkDao.addMany([artwork1, artwork2]);

      const result = await artworkDao.searchByName("oeu");

      expect(result).to.be.an("array");
      expect(result.length).to.be.eql(1);
      expect(result[0].name).to.be.eql("Oeuvre 1");
    });
  });
});
