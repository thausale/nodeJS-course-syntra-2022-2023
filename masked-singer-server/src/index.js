import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import actionRoutes from "./routes/actionroutes.js";

//
//VARS
const app = express();
const localURI = process.env.MONGO_URL;
const port = 3000;

//MIDDLEWARE
app.use(express.json());
app.use("/api", actionRoutes);

//Initialise

const startApp = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(localURI);
    console.log("db connected");
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();
