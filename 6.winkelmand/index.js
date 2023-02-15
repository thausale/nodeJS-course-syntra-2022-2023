import express from "express";
const app = express();
const PORT = 8888;
//APP LISTEN HAS TO BE AT THE BOTTOM, ADD MIDDLEWARE HERE
// app.use(pageRoutes); //IF USING cnExpressRouter
app.listen(PORT, () => console.log(`server is running at ${PORT}`));
