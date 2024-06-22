import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const serverPort = process.env.PORT || 8081;
const APIPATH = process.env.API_PATH || "/api/users";

const outputFile = "./swagger.json";
const endpointsFiles = ["./api/route.mjs"];

const config = {
<<<<<<< Updated upstream
  info: {
    title: "User API Documentation",
    description: "",
  },
  tags: [],
  host: "localhost:" + serverPort + APIPATH,
  schemes: ["http", "https"],
=======
	info: {
		title: "Culture API Documentation",
		description: "",
	},
	tags: [],
	host: "localhost:" + serverPort + APIPATH,
	schemes: ["http", "https"],
>>>>>>> Stashed changes
};

swaggerAutogen(outputFile, endpointsFiles, config);
