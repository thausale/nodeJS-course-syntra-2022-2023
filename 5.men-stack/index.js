import express from "express";
import mongoose from "mongoose";
import router from "./routes/movieRoutes.js";
//We maken standaard met express weer een HTTP server
//Variables
const app = express();
const port = 3000;
const endpoint = "/api";
// we zeggen tegen express dat ze json files moet gebruiken
//.json is blijkbaar built in middleware
//middleware
app.use(express.json());
//routes
app.use(endpoint, router);

//server start
(async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect("mongodb://0.0.0.0:27017/syntra");
    console.log("connected to the databank");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
