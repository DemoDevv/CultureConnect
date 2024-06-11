import { mongoose } from "mongoose";

const PORT = 8082;
const mongoURL = "mongodb://0.0.0.0:27017";
const mongoDB = "DB";

await mongoose.connect(`${mongoURL}/${mongoDB}`);
console.log(`Connected mongo on ${mongoURL}/${mongoDB}`);

const { default: app } = await import("./app.mjs");

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default server;
