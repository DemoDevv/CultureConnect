export default class Artwork {
  id;
  id_museum;
  name;
  author;
  type;
  size;

  constructor(obj) {
    this.id = obj.id;
    this.id_museum = obj.id_museum;
    this.name = obj.name;
    this.author = obj.author;
    this.type = obj.type;
    this.size = obj.size;
  }

  static fromCsvData(data) {
    let museofile = data["code_museofile"];

    //  Parfois, le code museofile est = à 'manquant'
    //  On invalide donc l'objet artwork en mettant une string vide
    if (museofile?.length === 0 || museofile === "manquant") museofile = "";

    return new Artwork({
      id: 0,
      id_museum: museofile,
      name: data["titre"],
      author: data["auteur"],
      type: data["domaine"],
      size: data["mesures"],
    });
  }
}
