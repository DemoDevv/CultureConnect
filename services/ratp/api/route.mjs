import express from "express";

import stopController from "./controllers/stopController.mjs";

const routes = express.Router();

routes.route("/").get(async (req, res) => {
  res.status(200).send("Hello world !");
});

routes.route("/stops").post(async (req, res) => {
  /*
  #swagger.tags = ['Stop']
  #swagger.description = 'Endpoint to get all stops near to a museum'
  #swagger.parameters['museum'] = {
    in: 'body',
    description: 'Museum object',
    required: true,
    type: 'object',
    schema: {
      museofile: 'string',
      name: 'string',
      coordinates: {
        longitude: 'number',
        latitude: 'number',
      },
      department: 'string',
      address: 'string',
      url: 'string',
      city: 'string',
    }
  }
  */
  try {
    const stops = await stopController.getAllStopsAroundMuseum(req.body);
    return res.status(200).json(stops);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
});

export default routes;
