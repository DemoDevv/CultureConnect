import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8081;
const mongoURL = "mongodb://0.0.0.0:27017";
const mongoDB = "DB";

await mongoose.connect(`${mongoURL}/${mongoDB}`);
console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);

const { default: app } = await import("./app.mjs");

const server = app.listen(PORT, () => {
	console.log(
		`Service [CultureAPI] listening on port ${PORT} (http://localhost:${PORT})`,
	);
});

export default server;
