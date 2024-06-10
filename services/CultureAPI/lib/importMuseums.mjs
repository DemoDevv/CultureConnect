import fs from "fs";
import { mongoose } from "mongoose";
import csv from "csv-parser";
import Museum from "../api/models/museum.mjs";
import Coordinates from "../api/models/coordinates.mjs";

const filePath = "./data/museums-2022_01_27.csv";
const mongoURL = "mongodb://localhost:27017";
const mongoDB = "DB";

await mongoose.connect(`${mongoURL}/${mongoDB}`);
console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);

const results = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (data) => {
    const museum = Museum.fromCsvData(data);

    if (!museum.isInIleDeFrance()) return;

    results.push(museum);
  })
  .on("error", console.error)
  .on("end", async () => {
    const { museumDao } = await import("../api/dao/museumDao.mjs");

    await museumDao.removeAll();
    await museumDao.addMany(results);

    console.log("Museum import done !");
  });
