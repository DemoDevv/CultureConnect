import express from "express";
import museumController from "./controllers/museumController.mjs";

const routes = express.Router();

routes.route("/museums").get(async (req, res) => {
  res.status(200).send("Hello world !");
});

routes.route("/museums/:museofile").get(async (req, res) => {
  /*
  #swagger.tags = ['Museum']
  #swagger.description = 'Endpoint to get a museum by its museofile'
  #swagger.parameters['museofile'] = {
    in: 'path',
    description: 'Museofile of the museum',
    required: true,
    type: 'string'
  }
  */
  const museofile = decodeURIComponent(req.params.museofile);
  const museum = await museumController.findByMuseofile(museofile);

  if (!museum)
    return res.status(400).send({ message: "Could not find museum" });

  res.status(200).send(museum);
});

export default routes;
