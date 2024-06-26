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

  describe("POST /register", function () {
    it("with invalid user", async function () {
      const user1 = new User({
        id: 1,
        email: "user1@example.com",
        password: "testing",
        favoris: ["A1"],
      });

      const response = await requestWithSupertest
        .post("/api/users/register")
        .send(user1);

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

      const response = await requestWithSupertest
        .post("/api/users/register")
        .send(user1);

      expect(response.status).to.be.eql(400);
    });

    it("creates user", async function () {
      const user1 = new User({
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      const response = await requestWithSupertest
        .post("/api/users/register")
        .send(user1);

      expect(response.status).to.be.eql(200);
      expect(
        (await userDao.findUserByEmail("user1@example.com")).pseudonyme
      ).to.be.eql("User1");
    });
  });

  describe("POST /login", function () {
    it("with not found email", async function () {
      const user1 = new User({
        email: "user1@example.com",
        password: "testing",
      });

      const response = await requestWithSupertest
        .post("/api/users/login")
        .send(user1);

      expect(response.status).to.be.eql(400);
    });

    it("with invalid password", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: ["A1"],
      });

      await userDao.createUser(user1);

      const response = await requestWithSupertest
        .post("/api/users/login")
        .send({
          email: "user1@example.com",
          password: "testinge",
        });

      expect(response.status).to.be.eql(400);
    });

    it("with valid password", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: ["A1"],
      });

      await userDao.createUser(user1);

      const response = await requestWithSupertest
        .post("/api/users/login")
        .send({
          email: "user1@example.com",
          password: "testing",
        });

      expect(response.status).to.be.eql(200);
      expect(response.body).to.have.property("token");
    });
  });

  describe("GET /favorites", function () {
    it("not logged in", async function () {
      const response = await requestWithSupertest.get("/api/users/favorites");

      expect(response.status).to.be.eql(401);
    });

    it("with empty favorites", async function () {
      const user1 = new User({
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      const token = (
        await requestWithSupertest.post("/api/users/register").send(user1)
      ).body.token;

      const response = await requestWithSupertest
        .get("/api/users/favorites")
        .set("Authorization", `Bearer: ${token}`);

      expect(response.status).to.be.eql(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.eql(0);
    });

    it("with favorites", async function () {
      const user1 = new User({
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      const token = (
        await requestWithSupertest.post("/api/users/register").send(user1)
      ).body.token;

      await userDao.addFavorite(user1.email, "A1");

      const response = await requestWithSupertest
        .get("/api/users/favorites")
        .set("Authorization", `Bearer: ${token}`);

      expect(response.status).to.be.eql(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.eql(1);
      expect(response.body[0]).to.be.eql("A1");
    });
  });

  describe("PUT /favorites", function () {
    it("not logged in", async function () {
      const response = await requestWithSupertest.put("/api/users/favorites");

      expect(response.status).to.be.eql(401);
    });

    it("with artwork already in favorites", async function () {
      const artwork1 = {
        id: 1,
        id_museum: "M1",
        name: "Oeuvre 1",
        author: "Auteur 1",
        type: "Peinture 1",
        size: "L: 20cm H: 36cm",
      };

      const user1 = new User({
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      const token = (
        await requestWithSupertest.post("/api/users/register").send(user1)
      ).body.token;

      await userDao.addFavorite(user1.email, artwork1);

      const response = await requestWithSupertest
        .put("/api/users/favorites")
        .set("Authorization", `Bearer: ${token}`)
        .send(artwork1);

      expect(response.status).to.be.eql(400);

      const favorites = await userDao.getFavorites(user1.email);
      expect(favorites.length).to.be.eql(1);
    });

    it("adds artwork to favorites", async function () {
      const artwork1 = {
        id: 1,
        id_museum: "M1",
        name: "Oeuvre 1",
        author: "Auteur 1",
        type: "Peinture 1",
        size: "L: 20cm H: 36cm",
      };

      const user1 = new User({
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      const token = (
        await requestWithSupertest.post("/api/users/register").send(user1)
      ).body.token;

      const response = await requestWithSupertest
        .put("/api/users/favorites")
        .set("Authorization", `Bearer: ${token}`)
        .send(artwork1);

      expect(response.status).to.be.eql(200);

      const favorites = await userDao.getFavorites(user1.email);

      expect(favorites.length).to.be.eql(1);
      expect(favorites[0].name).to.be.eql("Oeuvre 1");
    });
  });

  describe("DELETE /favorites/:artwork_id", function () {
    it("not logged in", async function () {
      const response = await requestWithSupertest.delete(
        "/api/users/favorites/A1"
      );

      expect(response.status).to.be.eql(401);
    });

    it("without artwork_id", async function () {
      const user1 = new User({
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      const token = (
        await requestWithSupertest.post("/api/users/register").send(user1)
      ).body.token;

      const response = await requestWithSupertest
        .delete("/api/users/favorites")
        .set("Authorization", `Bearer: ${token}`);

      expect(response.status).to.be.eq(404);
    });

    it("without artwork in favorites", async function () {
      const user1 = new User({
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      const token = (
        await requestWithSupertest.post("/api/users/register").send(user1)
      ).body.token;

      const response = await requestWithSupertest
        .delete("/api/users/favorites/A1")
        .set("Authorization", `Bearer: ${token}`);

      expect(response.status).to.be.eql(400);

      const favorites = await userDao.getFavorites(user1.email);
      expect(favorites.length).to.be.eql(0);
    });

    it("removes artwork from favorites", async function () {
      const user1 = new User({
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      const token = (
        await requestWithSupertest.post("/api/users/register").send(user1)
      ).body.token;

      await userDao.addFavorite(user1.email, "A1");

      const response = await requestWithSupertest
        .delete("/api/users/favorites/A1")
        .set("Authorization", `Bearer: ${token}`);

      const userFavorites = (await userDao.findUserByEmail("user1@example.com"))
        .favoris;

      expect(response.status).to.be.eql(200);
      expect(userFavorites).to.be.an("array");
      expect(userFavorites.length).to.be.eql(0);
    });
  });
});
