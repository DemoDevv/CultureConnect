import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const serverPort = process.env.PORT || 8083;
const APIPATH = process.env.API_PATH || "/api/ratp";

const outputFile = "./swagger.json";
const endpointsFiles = ["./api/route.mjs"];

const config = {
	info: {
		title: "Proxy RATP API Documentation",
		description: "",
	},
	tags: [],
	host: "localhost:" + serverPort + APIPATH,
	schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, config);
