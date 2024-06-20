import { assert, should, expect } from "chai";
import supertest from "supertest";
import server from "../../server.mjs";
import { mongoose } from "mongoose";
import User from "../../api/models/user.mjs";

const requestWithSupertest = supertest(server);

const user1 = new User({
  id: 1,
  pseudonyme: "User1",
  email: "user1@example.com",
  password: "testing",
  favoris: ["A1"],
});

const userDao = (await import("../../api/dao/userDao.mjs")).default;

describe("api/users", function () {
  before(async function () {
    await mongoose.connection.close();
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  beforeEach(async function () {
    await userDao.removeAll();
  });

  after(async function () {
    await mongoose.connection.close();
  });

  describe("/register", function () {
    it("with invalid user", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: ["A1"],
      });

      const response = await requestWithSupertest.post(
        "/api/users/register",
        user1
      );

      expect(response.status).to.be.eql(400);
    });

    it("with already existing user", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: ["A1"],
      });

      await userDao.createUser(user1);

      const response = await requestWithSupertest.post(
        "/api/users/register",
        user1
      );

      expect(response.status).to.be.eql(400);
    });

    it("creates user", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: ["A1"],
      });

      await userDao.createUser(user1);

      const response = await requestWithSupertest.post(
        "/api/users/register",
        user1
      );

      expect(response.status).to.be.eql(200);
      expect(
        (await userDao.findUserByEmail("user1@example.com")).pseudonyme
      ).to.be.eql("User1");
    });
  });
});
