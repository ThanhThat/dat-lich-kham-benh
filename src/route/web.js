import express from "express";
import { getHomePage, getCRUD, postCRUD } from "../controller/homeController";

const route = express.Router();

const initWebRoutes = (app) => {
  route.get("/", getHomePage);
  route.get("/crud", getCRUD);

  route.post("/post-crud", postCRUD);

  return app.use("/", route);
};

export default initWebRoutes;
