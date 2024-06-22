import express from "express";

const routes = express.Router();

routes.route("/").get(async (req, res) => {
	res.status(200).send("Hello world !");
});

export default routes;
