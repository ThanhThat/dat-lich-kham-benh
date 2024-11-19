import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.URL_ORIGIN,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
  console.log("Server is running on port " + listener.address().port);
});
