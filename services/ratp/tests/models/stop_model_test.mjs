import { assert, should, expect } from "chai";
import Stop from "../../api/models/stop.mjs";
import Coordinates from "../../api/models/coordinates.mjs";

describe("Stop model user", function () {
	const stop = new Stop({
		id: 1,
		type: "bus",
		name: "Le Louvre",
		coordinates: new Coordinates({
			latitude: 45,
			longitude: 1,
		}),
		city: "Paris",
	});

	const stopCsvData = {
		ArRType: "bus",
		ArRName: "Le Louvre",
		ArRGeopoint: "45,1",
		ArRTown: "Paris",
	};

	it("create", function () {
		expect(stop).have.property("type", "bus");
		expect(stop.coordinates).have.property("latitude", 45);
	});

	it("create from csv data", function () {
		const stopCsv = Stop.fromCsvData(stopCsvData);

		expect(stopCsv).have.property("type", "bus");
		expect(stopCsv.coordinates).have.property("latitude", 45);
	});
});
