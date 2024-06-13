import fs from "fs";
import { mongoose } from "mongoose";
import csv from "csv-parser";
import Stop from "../api/models/stop.mjs";

const filePath = "./data/stops.csv";
const mongoURL = "mongodb://localhost:27017";
const mongoDB = "DB";

await mongoose.connect(`${mongoURL}/${mongoDB}`);
console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);

//  Pour le moment on garde une DB relativement légère avec 1000 oeuvres
const results = [];
let n = 0;

fs.createReadStream(filePath)
	.pipe(
		csv({
			separator: ";",
		}),
	)
	.on("data", (data) => {
		if (n > 1000) return;

		console.log(Stop.fromCsvData(data));

		n++;
	})
	.on("error", console.error)
	.on("end", async () => {
		console.log(`Stops import done ! Added ${results.length} stops`);

		await mongoose.connection.close();
	});