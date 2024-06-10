import express from "express";

const API_PATH = "/api/culture";
const app = express();

app.use(express.json());

const { default: routes } = await import("./api/route.mjs");
app.use(`${API_PATH}/`, routes);

export default app;
