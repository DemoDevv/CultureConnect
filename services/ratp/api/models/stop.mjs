import Coordinates from "../models/coordinates.mjs";

export default class Stop {
	id;
	type;
	name;
	coordinates;
	city;

	constructor(obj) {
		this.id = obj.id;
		this.type = obj.type;
		this.name = obj.name;
		this.coordinates = obj.coordinates;
		this.city = obj.city;
	}

	static fromCsvData(data) {
		const [lat, lon] = data["ArRGeopoint"].split(",");

		return new Stop({
			id: 0,
			type: data["ArRType"],
			name: data["ArRName"],
			coordinates: new Coordinates({
				longitude: lon,
				latitude: lat,
			}),
			city: data["ArRTown"],
		});
	}
}
