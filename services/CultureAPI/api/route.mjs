import express from "express";
import museumController from "./controllers/museumController.mjs";
import artworkController from "./controllers/artworkController.mjs";

const routes = express.Router();

//  Museums
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

  return res.status(200).send(museum);
});

routes.route("/museums/artworks/:museofile").get(async (req, res) => {
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

  const result = await artworkController.findByMuseofile(museofile, page);

  return res.status(200).send(result);
});

//  Artworks
routes.route("/artworks/:id").get(async (req, res) => {
  /*
  #swagger.tags = ['Artwork']
  #swwagger.description = 'Endpoint to get an artwork by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID of the artwork',
    required: true,
    type: 'string'
  }
  */
  const id = decodeURIComponent(req.params.id);
  const artwork = await artworkController.findById(id);

  if (!artwork)
    return res.status(404).send({ message: "Could not find artwork" });

  res.status(200).send(artwork);
});

//  Search
routes.route("/search/:query").get(async (req, res) => {
  /*
  #swagger.tags = ['Artworks', 'Museums']
  #swagger.description = 'Endpoint to search a museum or an artwork via its name'
  #swagger.parameters['query'] = {
    in: 'path',
    description: 'Name of the artwork or museum',
    required: true,
    type: 'string'
  }
  */
  const page = getPage(req.params);
  const query = decodeURIComponent(req.params.query);

  if (!query || query?.length == 0) {
    return res.status(200).send({
      museums: [],
      artworks: [],
    });
  }

  const artworks = await artworkController.findByName(query, page);
  const museums = await museumController.findByName(query, page);

  return res.status(200).send({
    museums,
    artworks,
  });
});

function getPage(parameters) {
  const page = decodeURIComponent(parameters.page);

  //  TODO check si c'est un int

  return +page > 0 ? page : 1;
}

export default routes;
