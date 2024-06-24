import { expect } from "chai";
import Museum from "../../api/models/museum.mjs";

describe("Museum model test", function () {
	const museum = new Museum({
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
		city: "nantes",
	});

	const csvData = {
		"Identifiant muséofile": "M1",
		"Nom officiel du musée": "Museum1",
		Longitude: 20,
		Latitude: 20,
		Adresse: "Road 1",
		URL: "https://example.com",
		Commune: "nantes",
	};

	it("create", () => {
		expect(museum).have.property("city", "nantes");
		expect(museum.coordinates).have.property("longitude", 20);
		expect(museum).have.property("name", "Museum1");
	});

	it("create from csv data", function () {
		const museumCsv = Museum.fromCsvData(csvData);

		expect(museumCsv).have.property("city", museum.city);
		expect(museumCsv.coordinates).have.property(
			"longitude",
			museum.coordinates.longitude,
		);
		expect(museumCsv).have.property("name", museum.name);
	});

	describe("isInIleDeFrance", function () {
		it("not in ile de france", function () {
			expect(museum.isInIleDeFrance()).be.false;
		});

		it("in ile de france", function () {
			museum.department = "Paris";

			expect(museum.isInIleDeFrance()).be.true;
		});
	});
});
