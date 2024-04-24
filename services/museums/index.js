import express from "express";

const app = express();
const port = 8002;

app.get("/", (req, res) => {
  res.send({
    hello: "world !",
  });
});

app.listen(port, () => {
  console.log(`[API Museums] Listening on port ${port}...`);
});
