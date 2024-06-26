import fs from "fs";
import { mongoose } from "mongoose";
import csv from "csv-parser";
import Artwork from "../api/models/artwork.mjs";
import { artworkDao } from "../api/dao/artworkDao.mjs";
import { exit } from "process";

const filePath = "./data/joconde.csv";
const mongoURL = "mongodb://localhost:27017";
const mongoDB = "DB";

//  Regex pour valider les codes muséofile
const isMuseofileValid = /^M\d{4}$/;
const isMuseofileAlmostValid = /\d{4}$/;

await mongoose.connect(`${mongoURL}/${mongoDB}`);
console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);

const results = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (data) => {
    //  Transforme la ligne du csv en objet oeuvre
    const artwork = Artwork.fromCsvData(data);
    const museofile = validateMuseofile(artwork.id_museum);

    artwork.id_museum = museofile;

    //  On n'ajoute que les oeuvres valides, avec un code muséofile valide
    if (!museofile || !artworkDao.isValid(artwork)) return;

    results.push(artwork);
  })
  .on("error", console.error)
  .on("end", async () => {
    //  On reset la collection et ajoute toutes les oeuvres validées
    await artworkDao.removeAll();
    await artworkDao.addMany(results);

    console.log(`Artwork import done ! Added ${results.length} artworks`);
    exit(0);
  });

//  Permet de valider un code muséofile
//  Exemple code muséofile: M1234
//  Parfois le fichier CSV donne des codes muséofiles sans le préfixe M, auquel cas on l'ajoute si possible
//  Ou encore parfois le code muséofile est précédé d'un texte autre, auquel cas on supprime le texte en surplus
//  Retourne null si le code muséofile n'est pas valide
//
//  Afin de valider le maximum de code museofile
function validateMuseofile(museofile) {
  museofile = museofile.toUpperCase().trim(); //  On met le code en majuscule, et sans espaces avant et après le code
  museofile = museofile.length > 5 ? museofile.slice(0, 5) : museofile; // On s'assure que le code muséofile est à 5 de longueur

  //  SI le code est déjà valide, on le retourne
  if (isMuseofileValid.test(museofile)) return museofile;

  //  Si le code muséofile ne commence pas avec un M, on le rajoute
  if (isMuseofileAlmostValid.test(museofile)) {
    museofile = `M${museofile}`;
  }

  return isMuseofileValid.test(museofile) ? museofile : null;
}
