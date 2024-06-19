import express from "express";
import authenticateToken from "./middlewares/authenticate.mjs";
import userController from "./controllers/userController.mjs";

const routes = express.Router();

routes.post("/register", async (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = 'Endpoint to register a new user'
  #swagger.parameters['user'] = {
    in: 'body',
    description: 'User object',
    required: true,
    schema: {
      pseudonyme: 'JohnDoe',
      email: 'jhondoe@test.fr',
      password: 'password'
    }
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
    in: 'body',
    description: 'User object',
    required: true,
    schema: {
      email: 'jhondoe@test.fr',
      password: 'password'
    }
  }
  */
  try {
    const token = await userController.login(req.body);

    return res.status(200).json({ token });
  } catch (e) {
    return res.sendStatus(400);
  }
});

routes.get("/bookmarks", authenticateToken, async (req, res) => {
  return res.status(200).send("Hello world !");
});

routes.put(
  "/bookmarks/add/:artwork_id",
  authenticateToken,
  async (req, res) => {
    return res.status(200).send("Hello world !");
  }
);

routes.put(
  "/bookmarks/remove/:artwork_id",
  authenticateToken,
  async (req, res) => {
    return res.status(200).send("Hello world !");
  }
);

export default routes;
