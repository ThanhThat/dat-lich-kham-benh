import express from "express";
import {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
} from "../controller/homeController";

const route = express.Router();

const initWebRoutes = (app) => {
  route.get("/", getHomePage);
  route.get("/crud", getCRUD);

  route.post("/post-crud", postCRUD);
  route.get("/get-crud", displayGetCRUD);
  route.get("/edit-crud", getEditCRUD);
  route.post("/put-crud", putCRUD);

  return app.use("/", route);
};

export default initWebRoutes;
