import { expect } from "chai";
import { mongoose } from "mongoose";
import { museumDao } from "../../api/dao/museumDao.mjs";
import Museum from "../../api/models/museum.mjs";

describe("Museum DAO", function () {
	before(async () => {
		await mongoose.connection.close();
		const { MongoMemoryServer } = await import("mongodb-memory-server");
		const mongoServer = await MongoMemoryServer.create();
		const uri = mongoServer.getUri();
		await mongoose.connect(uri);
	});

	beforeEach(async () => {
		await museumDao.removeAll();
	});

	it("findAll empty", async function () {
		expect(await museumDao.findAll()).to.be.an("array").that.is.empty;
	});

	it("findAll museums", async function () {
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

		const museum2 = new Museum({
			museofile: "M2",
			name: "Museum2",
			coordinates: {
				longitude: 20,
				latitude: 20,
			},
			department: "Pays-de-la-Loire",
			address: "Road 2",
			url: "https://example2.com",
			city: "Angers",
		});

		await museumDao.addMany([museum1, museum2]);

		const result = await museumDao.findAll();

		expect(result.map((m) => m.name)).to.have.deep.members([
			"Museum1",
			"Museum2",
		]);
	});

	it("add invalid data", async function () {
		const museum1 = new Museum({
			id: 1,
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

		try {
			await museumDao.add(museum1);
		} catch (e) {
			expect(e).to.be.equal("Not a valid museum");
		}
	});

	it("add valid data", async function () {
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

		await museumDao.add(museum1);

		const museums = await museumDao.findAll();

		expect(museums[0].name).to.be.equal("Museum1");
	});

	it("addMany invalid data", async function () {
		const museum1 = new Museum({
			id: 1,
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

		const museum2 = new Museum({
			museofile: "M2",
			name: "Museum2",
			coordinates: {
				longitude: 20,
				latitude: 20,
			},
			department: "Pays-de-la-Loire",
			address: "Road 2",
			url: "https://example2.com",
			city: "Angers",
		});

		try {
			await museumDao.addMany([museum1, museum2]);
		} catch (e) {
			expect(e).to.be.equal("Not a valid museum");
		}
	});

	it("addMany valid data", async function () {
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

		const museum2 = new Museum({
			id: 2,
			museofile: "M2",
			name: "Museum2",
			coordinates: {
				longitude: 20,
				latitude: 20,
			},
			department: "Pays-de-la-Loire",
			address: "Road 2",
			url: "https://example2.com",
			city: "Angers",
		});

		await museumDao.addMany([museum1, museum2]);

		const museums = await museumDao.findAll();

		expect(museums.length).to.be.equal(2);
		expect(museums[1].name).to.be.equal("Museum2");
	});

	it("getByMuseofile not found", async function () {
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

		const result = await museumDao.getByMuseofile("M2");

		expect(result).to.be.null;
	});

	it("getByMuseofile found", async function () {
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

		await museumDao.add(museum1);

		const result = await museumDao.getByMuseofile("M1");

		expect(result.name).to.be.equal("Museum1");
	});

	it("removeAll removes all museums", async function () {
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

		const museum2 = new Museum({
			museofile: "M2",
			name: "Museum2",
			coordinates: {
				longitude: 20,
				latitude: 20,
			},
			department: "Pays-de-la-Loire",
			address: "Road 2",
			url: "https://example2.com",
			city: "Angers",
		});

		await museumDao.addMany([museum1, museum2]);

		const beforeMuseums = await museumDao.findAll();
		expect(beforeMuseums.length).to.be.equal(2);

		await museumDao.removeAll();

		const afterMuseums = await museumDao.findAll();
		expect(afterMuseums.length).to.be.equal(0);
	});
});
