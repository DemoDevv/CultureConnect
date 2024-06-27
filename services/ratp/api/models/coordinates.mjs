export default class Coordinates {
  /*
  Cette classe représente les coordonnées géographiques d'un point sur la Terre.
  */
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
