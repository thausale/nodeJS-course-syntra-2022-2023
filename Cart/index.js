import express from "express";
import pageRoutes from "./routes/pageRoutes.js";
import actionRoutes from "./routes/actionRoutes.js";
const app = express();
const PORT = 3000;
//APP LISTEN HAS TO BE AT THE BOTTOM, ADD MIDDLEWARE HERE
// app.use(pageRoutes); //IF USING cnExpressRouter
//ADD cnExpressListen to the bottom of the page to launch server

// view engine => template engine thats being used
app.set("view engine", "ejs");

// The folder where your ejs files live
app.set("views", "views");
// make a folder public for public js & css
app.use(express.static("public"));
//Telling express to use json
app.use(express.json());

app.use(pageRoutes);
app.use(actionRoutes);

(async () => {
  try {
    // await connect();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
