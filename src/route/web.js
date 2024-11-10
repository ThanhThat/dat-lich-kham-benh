import express from "express";
import { getHomePage } from "../controller/homeController";

const route = express.Router();

const initWebRoutes = (app) => {
  route.get("/", getHomePage);

  return app.use("/", route);
};

export default initWebRoutes;
