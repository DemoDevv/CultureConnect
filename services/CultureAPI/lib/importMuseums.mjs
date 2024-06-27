import fs from "fs";
import { mongoose } from "mongoose";
import csv from "csv-parser";
import Museum from "../api/models/museum.mjs";
import { exit } from "process";

const filePath = "./data/museums-2022_01_27.csv";
const mongoURL = "mongodb://localhost:27017";
const mongoDB = "DB";

await mongoose.connect(`${mongoURL}/${mongoDB}`);
console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);

const { museumDao } = await import("../api/dao/museumDao.mjs");

const results = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (data) => {
    //  Transforme la ligne du csv en objet musée
    const museum = Museum.fromCsvData(data);

    //	on ne garde que les musées se situant en IDF
    if (!museum.isInIleDeFrance()) return;

    results.push(museum);
  })
  .on("error", console.error)
  .on("end", async () => {
    //  On reset la collection et ajoute toutes les musées validées
    await museumDao.removeAll();
    await museumDao.addMany(results);

    console.log("Museum import done !");
    exit(0);
  });
