import express from "express";
import stopController from "./controllers/stopController.mjs";

const routes = express.Router();

routes.route("/").get(async (req, res) => {
	res.status(200).send("Hello world !");
});

routes.route("/stops").post(async (req, res) => {
	/*
  #swagger.tags = ['Stop']
  #swagger.description = 'Endpoint to get all stops around a museum'
  #swagger.parameters['museum'] = {
    in: 'body',
    description: 'Museum object',
    required: true,
    type: 'object',
    schema: {
      "museofile": "string",
      "name": "string",
      "coordinates": {
        "latitude": "48.646025",
        "longitude": "1.823892"
      },
      "department": "string",
      "address": "string",
      "url": "string",
      "city": "rambouillet"
    }
  }
  */
	const museum = req.body;
	const stops = await stopController.getAllStopsAroundMuseum(museum);

	return res.status(200).send(stops);
});

export default routes;
