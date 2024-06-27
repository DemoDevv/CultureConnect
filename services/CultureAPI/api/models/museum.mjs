import Coordinates from "./coordinates.mjs";

//	Liste des départements d'IDF, permettant de filtrer les musées selon leur département
const idf_departments = [
  "paris",
  "seine-et-marne",
  "yvelines",
  "hauts-de-seine",
  "seine-saint-denis",
  "val-de-marne",
  "val-d'oise",
];

/*
	Modèle représentant un musée
*/
export default class Museum {
  id;
  museofile;
  name;
  coordinates;
  department;
  address;
  url;
  city;

  constructor(obj) {
    this.id = obj.id;
    this.museofile = obj.museofile;
    this.name = obj.name;
    this.coordinates = obj.coordinates;
    this.address = obj.address;
    this.department = obj.department;
    this.address = obj.address;
    this.url = obj.url;
    this.city = obj.city;
  }

  //	Indique si le musées se trouve en IDF
  isInIleDeFrance() {
    return idf_departments.includes(this.department.toLowerCase());
  }

  static fromCsvData(data) {
    return new Museum({
      id: 0,
      museofile: data["Identifiant Muséofile"],
      name: data["Nom officiel du musée"],
      coordinates: Coordinates.fromCsvData(data),
      department: data["Département"],
      address: data["Adresse"],
      url: data["URL"],
      city: data["Commune"].toLowerCase(),
    });
  }
}
