import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json" assert { type: "json" };

const API_PATH = process.env.API_PATH || "/api/culture";
const app = express();

app.use(express.json());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));

const { default: routes } = await import("./api/route.mjs");
app.use(`${API_PATH}/`, routes);

export default app;
