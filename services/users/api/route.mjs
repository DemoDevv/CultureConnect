import express from "express";
import userController from "./controllers/userController.mjs";

const routes = express.Router();

routes.route("/register").post(async (req, res) => {
  /*
  #swagger.tags = ['User']
  #swagger.description = 'Endpoint to register a new user'
  #swagger.parameters['newUser'] = {
    in: 'body',
    description: 'User object',
    required: true,
    schema: {
      pseudonyme: 'JohnDoe',
      email: 'jhondoe@test.fr',
      password: 'password'
    }
  */
  const token = await userController.register(req.body.user);

  if (token == null) return res.sendStatus(400);

  res.status(200).json({ token });
});

routes.route("/login").post(async (req, res) => {
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
  */
  const token = await userController.login(req.body.user);

  if (token == null) return res.sendStatus(400);

  res.status(200).json({ token });
});

export default routes;
