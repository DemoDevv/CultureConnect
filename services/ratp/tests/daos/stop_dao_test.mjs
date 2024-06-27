import { assert, should, expect } from "chai";
import { mongoose } from "mongoose";
import { stopDao } from "../../api/dao/stopDao.mjs";
import Stop from "../../api/models/stop.mjs";
import Coordinates from "../../api/models/coordinates.mjs";

describe("Stop DAO", function () {
	before(async () => {
		await mongoose.connection.close();
		const { MongoMemoryServer } = await import("mongodb-memory-server");
		const mongoServer = await MongoMemoryServer.create();
		const uri = mongoServer.getUri();

		await mongoose.connect(uri);
	});

	beforeEach(async () => {
		await stopDao.removeAll();
	});

	it("removeAll", async function () {
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
			type: "métro",
			name: "Gare du Nord",
			coordinates: new Coordinates({
				latitude: 44,
				longitude: 2,
			}),
			city: "Paris",
		});

		await stopDao.addMany([stop1, stop2]);
		expect((await stopDao.findAll()).length).to.be.eql(2);

		await stopDao.removeAll();
		expect((await stopDao.findAll()).length).to.be.eql(0);
	});

	it("findAll", async function () {
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
			type: "métro",
			name: "Gare du Nord",
			coordinates: new Coordinates({
				latitude: 44,
				longitude: 2,
			}),
			city: "Paris",
		});

		await stopDao.addMany([stop1, stop2]);

		const result = await stopDao.findAll();

		expect(result).to.be.an("array");
		expect(result.length).to.be.eql(2);
		expect(result[1].type).to.be.eql("métro");
	});

	describe("add", function () {
		it("with invalid data", async function () {
			const stop1 = new Stop({
				id: 1,
				type: "bus",
				coordinates: new Coordinates({
					latitude: 45,
					longitude: 1,
				}),
				city: "Paris",
			});

			try {
				await stopDao.add(stop1);
			} catch (e) {
				expect(e).to.be.eql("Not a valid stop.");
			}

			expect((await stopDao.findAll()).length).to.be.eql(0);
		});

		it("with valid data", async function () {
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

			expect((await stopDao.findAll()).length).to.be.eql(0);

			await stopDao.add(stop1);

			expect((await stopDao.findAll()).length).to.be.eql(1);
		});
	});

	describe("addMany", function () {
		it("with invalid data", async function () {
			const stop1 = new Stop({
				id: 1,
				type: "bus",
				name: "Le Louvre",
				coordinates: new Coordinates({
					latitude: 45,
					longitude: 1,
				}),
			});

			const stop2 = new Stop({
				id: 1,
				type: "métro",
				name: "Gare du Nord",
				coordinates: new Coordinates({
					longitude: 2,
				}),
				city: "Paris",
			});

			expect((await stopDao.findAll()).length).to.be.eql(0);

			try {
				await stopDao.addMany([stop1, stop2]);
			} catch (e) {
				expect(e).to.be.eql("Not a valid stop.");
			}

			expect((await stopDao.findAll()).length).to.be.eql(0);
		});

		it("with valid data", async function () {
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
				type: "métro",
				name: "Gare du Nord",
				coordinates: new Coordinates({
					latitude: 44,
					longitude: 2,
				}),
				city: "Paris",
			});

			expect((await stopDao.findAll()).length).to.be.eql(0);

			await stopDao.addMany([stop1, stop2]);

			expect((await stopDao.findAll()).length).to.be.eql(2);
		});
	});

	describe("getById", function () {
		it("with not found stop", async function () {
			expect(await stopDao.getById("1")).to.be.null;
		});

		it("with existing stop", async function () {
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

			await stopDao.add(stop1);
			const stopId = (await stopDao.findAll())[0].id;

			const result = await stopDao.getById(stopId);

			expect(result.type).to.be.eql("bus");
			expect(result.name).to.be.eql("Le Louvre");
		});
	});

	describe("getByCity", function () {
		it("with not found stop", async function () {
			expect(await stopDao.getByCity("Rambouillette")).to.be.eql([]);
		});

		it("with existing stop", async function () {
			const stop1 = new Stop({
				id: 1,
				type: "bus",
				name: "Le Louvre",
				coordinates: new Coordinates({
					latitude: 45,
					longitude: 1,
				}),
				city: "paris",
			});

			await stopDao.add(stop1);

			const result = await stopDao.getByCity("paris");

			expect(result[0].type).to.be.eql("bus");
			expect(result[0].name).to.be.eql("Le Louvre");
		});
	});
});
