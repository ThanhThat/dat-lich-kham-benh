import express from "express";
import {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
} from "../controller/homeController";
import userController from "../controller/userController";

const route = express.Router();

const initWebRoutes = (app) => {
  route.get("/", getHomePage);
  route.get("/crud", getCRUD);

  route.post("/post-crud", postCRUD);
  route.get("/get-crud", displayGetCRUD);
  route.get("/edit-crud", getEditCRUD);
  route.post("/put-crud", putCRUD);
  route.post("/delete-crud", deleteCRUD);

  route.post("/api/login", userController.handleLogin);
  route.get("/api/get-all-users", userController.handleGetAllUsers);

  return app.use("/", route);
};

export default initWebRoutes;
