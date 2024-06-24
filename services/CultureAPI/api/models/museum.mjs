import Coordinates from "./coordinates.mjs";

const idf_departments = [
	"paris",
	"seine-et-marne",
	"yvelines",
	"hauts-de-seine",
	"seine-saint-denis",
	"val-de-marne",
	"val-d'oise",
];

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
