import fs from "fs";
import { mongoose } from "mongoose";
import csv from "csv-parser";
import Artwork from "../api/models/artwork.mjs";
import { artworkDao } from "../api/dao/artworkDao.mjs";

const filePath = "./data/joconde.csv";
const mongoURL = "mongodb://localhost:27017";
const mongoDB = "DB";

await mongoose.connect(`${mongoURL}/${mongoDB}`);
console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);

//  Pour le moment on garde une DB relativement légère avec 1000 oeuvres
const results = [];
let n = 0;

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (data) => {
    if (n > 1000) return;

    const artwork = Artwork.fromCsvData(data);

    if (!artworkDao.isValid(artwork)) return;

    results.push(artwork);
    n++;
  })
  .on("error", console.error)
  .on("end", async () => {
    await artworkDao.removeAll();
    await artworkDao.addMany(results);

    console.log(`Artwork import done ! Added ${results.length} artworks`);
  });
