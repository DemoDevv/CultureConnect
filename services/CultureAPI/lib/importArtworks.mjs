import fs from "fs";
import { mongoose } from "mongoose";
import csv from "csv-parser";
import Artwork from "../api/models/artwork.mjs";

const filePath = "./data/joconde.csv";
const mongoURL = "mongodb://localhost:27017";
const mongoDB = "DB";

await mongoose.connect(`${mongoURL}/${mongoDB}`);
console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);

const results = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (data) => {
    console.log(data);
    // const museum = Museum.fromCsvData(data);

    // if (!museum.isInIleDeFrance()) return;

    // results.push(museum);
  })
  .on("error", console.error)
  .on("end", async () => {
    // const { museumDao } = await import("../api/dao/museumDao.mjs");

    // await museumDao.removeAll();
    // await museumDao.addMany(results);

    console.log("Artwork import done !");
  });