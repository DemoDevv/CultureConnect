import express from "express";
import museumController from "./controllers/museumController.mjs";

const routes = express.Router();

routes.route("/museums").get(async (req, res) => {
  res.status(200).send("Hello world !");
});

routes.route("/museums/:museofile").get(async (req, res) => {
  const museofile = decodeURIComponent(req.params.museofile);
  const museum = await museumController.findByMuseofile(museofile);

  if (!museum)
    return res.status(400).send({ message: "Could not find museum" });

  res.status(200).send(museum);
});

export default routes;
