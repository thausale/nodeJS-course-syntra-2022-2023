import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import router from "./routes/movieRoutes.js";
import cors from "cors";

//We maken standaard met express weer een HTTP server
//Variables
const app = express();
const endpoint = "/api";
const { MONGO_URL, PORT, FRONT_END_URL, NODE_ENV } = process.env;
const corsOptions = { FRONT_END_URL };

// we zeggen tegen express dat ze json files moet gebruiken
//.json is blijkbaar built in middleware
//middleware
app.use(express.json());
app.use(cors(corsOptions));
//routes
app.use(endpoint, router);
//server start
(async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(MONGO_URL);
    console.log("connected to the databank");
    app.listen(PORT, () => {
      //De && hieronder is shorthand, als de linkerkant true is voert hij rechts uit
      if (NODE_ENV === "development") {
        console.log("server runt op localhost " + PORT);
      } else {
        console.log("server runt");
      }
    });
  } catch (error) {
    console.error(error);
  }
})();
