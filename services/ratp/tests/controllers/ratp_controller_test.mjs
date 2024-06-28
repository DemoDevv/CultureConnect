import { assert, should, expect } from "chai";
import supertest from "supertest";
import server from "../../server.mjs";
import { mongoose } from "mongoose";
import Stop from "../../api/models/stop.mjs";
import Coordinates from "../../api/models/coordinates.mjs";

const requestWithSupertest = supertest(server);

//  TODO
const { stopDao } = await import("../../api/dao/stopDao.mjs");

describe("api/ratp", function () {
  before(async function () {
    await mongoose.connection.close();
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  beforeEach(async function () {
    // await artworkDao.removeAll();
  });

  after(async function () {
    await mongoose.connection.close();
  });

  describe("GET /stops", function () {
    const stop1 = new Stop({
      id: 1,
      type: "bus",
      name: "Le Louvre",
      coordinates: new Coordinates({
        latitude: 45,
        longitude: 1,
      }),
      city: "Paris",
    });

    const stop2 = new Stop({
      id: 1,
      type: "bus",
      name: "Le Louvre",
      coordinates: new Coordinates({
        latitude: 45,
        longitude: 1,
      }),
      city: "Paris",
    });

    const stop3 = new Stop({
      id: 1,
      type: "bus",
      name: "Le Louvre",
      coordinates: new Coordinates({
        latitude: 45,
        longitude: 1,
      }),
      city: "Paris",
    });

    it("with empty result", async function () {
      const result = await requestWithSupertest.get("/api/ratp/stops").send({
        city: "Paris",
        museum: {
          muesufile: "M0001",
          name: "",
        },
      });
    });
  });
});
