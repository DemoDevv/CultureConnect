import { assert, should, expect } from "chai";
import Artwork from "../../api/models/artwork.mjs";

describe("Artwork model test", function () {
  const artwork = new Artwork({
    id: 1,
    id_museum: "M1",
    name: "Artwork 1",
    author: "Auteur 1",
    type: "Peinture",
    size: "L: 20cm H: 36cm",
  });

  const csvData = {
    code_museofile: "M1",
    titre: "Artwork 1",
    auteur: "Auteur 1",
    domaines: "Peinture",
    size: "L: 20cm H: 36cm&",
  };

  it("create", () => {
    expect(artwork).have.property("name", "Artwork 1");
    expect(artwork).have.property("id_museum", "M1");
  });

  it("create from csv data", function () {
    const artworkCsv = Artwork.fromCsvData(csvData);

    expect(artworkCsv).have.property("name", artwork.name);
    expect(artworkCsv).have.property("author", artwork.author);
  });
});
