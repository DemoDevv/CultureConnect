import { assert, should, expect } from "chai";
import supertest from "supertest";
import server from "../../server.mjs";
import { mongoose } from "mongoose";
import Artwork from "../../api/models/artwork.mjs";

const requestWithSupertest = supertest(server);

const artwork1 = new Artwork({
	id: 10,
	id_museum: "M1",
	name: "A1",
	author: "Author A",
	type: "Peinture",
	size: "L: 20cm H: 36cm",
});

const { artworkDao } = await import("../../api/dao/artworkDao.mjs");

describe("api/culture/artworks", function () {
	before(async function () {
		await mongoose.connection.close();
		const { MongoMemoryServer } = await import("mongodb-memory-server");
		const mongoServer = await MongoMemoryServer.create();
		const uri = mongoServer.getUri();

		await mongoose.connect(uri);
	});

	beforeEach(async function () {
		await artworkDao.removeAll();
	});

	after(async function () {
		await mongoose.connection.close();
	});

	describe("GET /:id", async function () {
		it("with not found artwork", async function () {
			const response = await requestWithSupertest.get(
				"/api/culture/artworks/A1",
			);

			expect(response.status).to.eql(404);
		});

		it("with found artwork", async function () {
			await artworkDao.add(artwork1);
			const artworkId = (await artworkDao.findAll())[0].id;

			const response = await requestWithSupertest.get(
				`/api/culture/artworks/${artworkId}`,
			);

			expect(response.status).to.be.eql(200);
			expect(response.body.name).to.be.eql("A1");
		});
	});
});
