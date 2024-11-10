import express from "express";

const configViewEngine = (app) => {
  app.use(express.static("./src/public")); // config static file (file css, image, js)
  app.set("view engine", "ejs"); // set view engine
  app.set("views", "./src/views");
};

export default configViewEngine;
