import express from "express";
import authenticateToken from "./middlewares/authenticate.mjs";
import userController from "./controllers/userController.mjs";
import userDao from "./dao/userDao.mjs";

const routes = express.Router();

routes.post("/register", async (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = 'Endpoint to register a new user'
  #swagger.parameters['user'] = {
    required: true,
    in: 'body',
    schema: {
      pseudonyme: 'JohnDoe',
      email: 'jhondoe@test.fr',
      password: 'password'
    },
  }
  */
  try {
    const token = await userController.register(req.body);

    return res.status(200).json({ token });
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
});

routes.post("/login", async (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = 'Endpoint to login a user'
  #swagger.parameters['user'] = {
    required: true,
    in: 'body',
    schema: {
      email: 'jhondoe@test.fr',
      password: 'password'
    },
  }
  */
  try {
    const token = await userController.login(req.body);

    return res.status(200).json({ token });
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
});

routes.get("/favorites", authenticateToken, async (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = 'Endpoint to get all favorites of a user'
  #swagger.security = [{
    "bearerAuth": []
  }]
  */
  return res.status(200).json(await userDao.getFavorites(req.user.email));
});

routes.put("/favorites", authenticateToken, async (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = 'Endpoint to add a favorite to a user'
  #swagger.security = [{
    "bearerAuth": []
  }]
  #swagger.parameters['artwork'] = {
    in: 'body',
    description: 'Artwork object',
    required: true,
    type: 'object',
    schema: {
      "id_museum": "E000000000",
      "name": "Le Lead",
      "author": "Mathieu",
      "type": "Peinture",
      "size": "100x100",
    }
  }
  */
  const artwork = req.body;

  try {
    await userController.addFavorite(req.user.email, artwork);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
});

routes.delete("/favorites/:artwork_id", authenticateToken, async (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = 'Endpoint to remove a favorite from a user'
  #swagger.security = [{
    "bearerAuth": []
  }]
  #swagger.parameters['artwork_id'] = {
    in: 'path',
    description: 'Artwork id',
    required: true,
    type: 'string'
  }
  */
  const artwork_id = decodeURIComponent(req.params.artwork_id);

  if (!artwork_id) {
    return res.sendStatus(400);
  }

  try {
    await userController.removeFavorite(req.user.email, artwork_id);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
});

export default routes;
