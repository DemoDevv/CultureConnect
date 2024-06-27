import fs from "fs";
import { mongoose } from "mongoose";
import csv from "csv-parser";
import Stop from "../api/models/stop.mjs";
import { stopDao } from "../api/dao/stopDao.mjs";

const filePath = "./data/stops.csv";
const mongoURL = "mongodb://localhost:27017";
const mongoDB = "DB";

await mongoose.connect(`${mongoURL}/${mongoDB}`);
console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);

const results = [];

fs.createReadStream(filePath)
  .pipe(
    csv({
      separator: ";",
    }),
  )
  .on("data", (data) => {
    results.push(Stop.fromCsvData(data));
  })
  .on("error", console.error)
  .on("end", async () => {
    console.log(`Stops import done ! Added ${results.length} stops`);
    try {
      await stopDao.removeAll();
      await stopDao.addMany(results);
    } catch (e) {
      console.error(e);
    }

    await mongoose.connection.close();
  });
