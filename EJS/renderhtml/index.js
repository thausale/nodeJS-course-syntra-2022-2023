import express from "express";
const app = express();
const PORT = 3000;
const routeOptions = { root: "public" };

app.use(express.static("public"));
app.get("/about", (req, res) => {
  res.sendFile("about.html", routeOptions);
});

app.get("/", (req, res) => {
  res.sendFile("index.html", routeOptions);
});

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
