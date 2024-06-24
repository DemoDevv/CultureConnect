import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json" assert { type: "json" };

const API_PATH = process.env.API_PATH || "/api/users";
const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));

const { default: routes } = await import("./api/route.mjs");
app.use(`${API_PATH}/`, routes);

export default app;
