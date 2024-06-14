import express, { Router } from "express";
import museumController from "./controllers/museumController.mjs";
import artworkController from "./controllers/artworkController.mjs";

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
    return res.status(404).send({ message: "Could not find museum" });

  res.status(200).send(museum);
});

routes.route("/museums/:museofile/artworks").get(async (req, res) => {
  /*
  #swagger.tags = ['Museum']
  #swagger.description = 'Endpoint to get the artworks of a museum'
  #swagger.parameters['page'] = {
    in: 'path',
    description: 'Page result number',
    required: false,
    default: 1,
    type: 'number'
  }
  #swagger.parameters['museofile'] = {
    in: 'path',
    description: 'Museofile of the museum',
    required: true,
    type: 'string'
  }
  */
  const page = getPage(req.params);
  const museofile = decodeURIComponent(req.params.museofile);

  res.status(200).send(await artworkController.findByMuseofile(museofile));
});

routes.route("/artworks/:id").get(async (req, res) => {
  /*
  #swagger.tags = ['Artwork']
  #swwagger.description = 'Endpoint to get an artwork by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID of the artwork',
    required: true,
    type: 'string
  }
  }
  */
  const id = decodeURIComponent(req.params.id);
  const artwork = await artworkController.findById(id);

  if (!artwork)
    return res.status(404).send({ message: "Could not find artwork" });

  res.status(200).send(artwork);
});

function getPage(parameters) {
  const page = decodeURIComponent(parameters.page);

  return +page > 0 ? page : 1;
}

export default routes;
