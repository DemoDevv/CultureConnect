import express from "express";

const app = express();
const port = 8001;

app.get("/", (req, res) => {
  res.send({
    hello: "world !",
  });
});

app.listen(port, () => {
  console.log(`[API Artworks] Listening on port ${port}...`);
});
