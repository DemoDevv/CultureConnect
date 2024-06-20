import { assert, should, expect } from "chai";
import { mongoose } from "mongoose";
import userDao from "../../api/dao/userDao.mjs";
import User from "../../api/models/user.mjs";

describe("User DAO", function () {
  before(async () => {
    await mongoose.connection.close();
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  beforeEach(async () => {
    await userDao.removeAll();
  });

  describe("createUser", function () {
    it("invalid user", async function () {
      const user = new User({
        id: 1,
        email: "user1@example.com",
        password: "testing",
      });

      try {
        await userDao.createUser(user);
      } catch (e) {
        expect(e).to.be.equal("Not a valid user");
      }
    });

    it("invalid email", async function () {
      const user = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example",
        password: "testing",
      });

      try {
        await userDao.createUser(user);
      } catch (e) {
        expect(e).to.be.equal("Not a valid user");
      }
    });

    it("valid user", async function () {
      const user = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      await userDao.createUser(user);

      const userResult = await userDao.findUserByEmail("user1@example.com");

      expect(userResult.email).to.be.eql(user.email);
    });
  });

  it("removeAll users", async function () {
    const user1 = new User({
      id: 1,
      pseudonyme: "User1",
      email: "user1@example.com",
      password: "testing",
    });

    const user2 = new User({
      id: 2,
      pseudonyme: "User2",
      email: "user2@example.com",
      password: "testing",
    });

    await userDao.createUser(user1);
    await userDao.createUser(user2);

    const beforeAllUsers = await userDao.findAll();
    expect(beforeAllUsers.length).to.be.eql(2);

    await userDao.removeAll();

    const afterAllUsers = await userDao.findAll();
    expect(afterAllUsers.length).to.be.eql(0);
  });

  describe("findAll", function () {
    it("with no users", async function () {
      const result = await userDao.findAll();

      expect(result).to.be.an("array");
      expect(result.length).to.be.eql(0);
    });

    it("with users", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      const user2 = new User({
        id: 2,
        pseudonyme: "User2",
        email: "user2@example.com",
        password: "testing",
      });

      await userDao.createUser(user1);
      await userDao.createUser(user2);

      const result = await userDao.findAll();

      expect(result).to.be.an("array");
      expect(result.length).to.be.eql(2);
    });
  });

  describe("findUserById", function () {
    it("with not found user", async function () {
      expect(await userDao.findUserById("1")).to.be.null;
    });

    it("with found user", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      await userDao.createUser(user1);

      const userId = (await userDao.findAll())[0];
      const result = await userDao.findUserById(userId.id);

      expect(result.email).to.be.eql(user1.email);
    });
  });

  describe("findUserByEmail", function () {
    it("with not found user", async function () {
      expect(await userDao.findUserByEmail("user@example.com")).to.be.null;
    });

    it("with found user", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      await userDao.createUser(user1);

      const result = await userDao.findUserByEmail("user1@example.com");
      expect(result.email).to.be.eql(user1.email);
      expect(result.pseudonyme).to.be.eql(user1.pseudonyme);
    });
  });

  describe("updateUser", function () {
    it("with not found user", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      await userDao.updateUser(user1);

      const users = await userDao.findAll();

      expect(users).to.be.an("array");
      expect(users.length).to.be.eql(0);
    });

    it("with invalid data", async function () {
      const user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      await userDao.createUser(user1);

      try {
        user1.email = null;
        await userDao.updateUser(user1);
      } catch (e) {
        expect(e).to.be.eql("Not a valid user");
      }
    });

    it("with valid data", async function () {
      let user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
      });

      await userDao.createUser(user1);
      user1 = await userDao.findUserByEmail("user1@example.com");

      user1.email = "uuser@example.com";
      await userDao.updateUser(user1);

      const resultUser = await userDao.findUserByEmail("uuser@example.com");
      expect(resultUser.pseudonyme).to.be.eql("User1");
      expect(resultUser.email).to.be.eql("uuser@example.com");
    });
  });

  describe("getFavorites", function () {
    it("with not found user", async function () {
      try {
        await userDao.getFavorites("user@example.com");
      } catch (e) {
        expect(e).to.be.eql("User not found");
      }
    });

    it("with empty favorites", async function () {
      let user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: [],
      });

      await userDao.createUser(user1);

      const result = await userDao.getFavorites("user1@example.com");

      expect(result).to.be.an("array");
      expect(result.length).to.be.eql(0);
    });

    it("with favorites", async function () {
      let user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: ["A1"],
      });

      await userDao.createUser(user1);

      const result = await userDao.getFavorites("user1@example.com");

      expect(result).to.be.an("array");
      expect(result.length).to.be.eql(1);
      expect(result[0]).to.be.eql("A1");
    });
  });

  describe("addFavorite", function () {
    it("with not found user", async function () {
      try {
        await userDao.addFavorite("user@example.com", "A1");
      } catch (e) {
        expect(e).to.be.eql("User not found");
      }
    });

    it("with already added as favorite", async function () {
      let user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: ["A1"],
      });

      await userDao.createUser(user1);

      try {
        await userDao.addFavorite("user1@example.com", "A1");
      } catch (e) {
        expect(e).to.be.eql("Artwork already added to favorites");
      }
    });

    it("adds a favorite artworks", async function () {
      let user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: [],
      });

      await userDao.createUser(user1);

      expect(
        (await userDao.findUserByEmail("user1@example.com")).favoris.length
      ).to.be.eql(0);

      await userDao.addFavorite("user1@example.com", "A1");

      const favorites = (await userDao.findUserByEmail("user1@example.com"))
        .favoris;

      expect(favorites).to.be.an("array");
      expect(favorites.length).to.be.eql(1);
      expect(favorites[0]).to.be.eql("A1");
    });
  });

  describe("removeFavorite", function () {
    it("with not found user", async function () {
      try {
        await userDao.addFavorite("user@example.com", "A1");
      } catch (e) {
        expect(e).to.be.eql("User not found");
      }
    });

    it("with not present in favorites", async function () {
      let user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: [],
      });

      await userDao.createUser(user1);

      try {
        await userDao.removeFavorite("user1@example.com", "A1");
      } catch (e) {
        expect(e).to.be.eql("Artwork not in your favorites");
      }
    });

    it("remove a favorite artworks", async function () {
      let user1 = new User({
        id: 1,
        pseudonyme: "User1",
        email: "user1@example.com",
        password: "testing",
        favoris: ["A1"],
      });

      await userDao.createUser(user1);

      expect(
        (await userDao.findUserByEmail("user1@example.com")).favoris.length
      ).to.be.eql(1);

      await userDao.removeFavorite("user1@example.com", "A1");

      const favorites = (await userDao.findUserByEmail("user1@example.com"))
        .favoris;

      expect(favorites).to.be.an("array");
      expect(favorites.length).to.be.eql(0);
    });
  });
});
