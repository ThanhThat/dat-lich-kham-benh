import express from "express";
import {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
} from "../controller/homeController";

const route = express.Router();

const initWebRoutes = (app) => {
  route.get("/", getHomePage);
  route.get("/crud", getCRUD);

  route.post("/post-crud", postCRUD);
  route.get("/get-crud", displayGetCRUD);

  return app.use("/", route);
};

export default initWebRoutes;
