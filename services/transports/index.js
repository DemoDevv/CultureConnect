import express from "express";

const app = express();
const port = 8003;

app.get("/", (req, res) => {
  res.send({
    hello: "world !",
  });
});

app.listen(port, () => {
  console.log(`[API Transports] Listening on port ${port}...`);
});
