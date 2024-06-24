import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8082;
const mongoURL = "mongodb://localhost:27017";
const mongoDB = "DB";
const env =
  new URL(import.meta.url).searchParams.get("ENV") || process.env.ENV || "PROD";

console.log(`Environnement: ${env}`);

if (env === "TEST") {
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  console.log(`Connected to mongo on ${uri} (:memory:)`);
} else {
  await mongoose.connect(`${mongoURL}/${mongoDB}`);
  console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);
}

const { default: app } = await import("./app.mjs");

const server = app.listen(PORT, () => {
  console.log(
    `Service [users] listening on port ${PORT} (http://localhost:${PORT})`
  );
});

export default server;
