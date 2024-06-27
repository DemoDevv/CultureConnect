/*
	Modèle représentant une coordonnée GPS
*/
export default class Coordinates {
  longitude;
  latitude;

  constructor(obj) {
    this.longitude = +obj.longitude;
    this.latitude = +obj.latitude;
  }

  static fromCsvData(data) {
    return new Coordinates({
      longitude: data["Longitude"],
      latitude: data["Latitude"],
    });
  }
}
