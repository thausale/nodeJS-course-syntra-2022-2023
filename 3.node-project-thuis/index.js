import http from "http";
import { nanoid } from "nanoid";
import chalk from "chalk";
import express, { json } from "express";
import { URL } from "url";

const app = express();
const port = 8889;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    const arr = req.query.id;
    // console.log(req.query.id);
    res.json(req.query.id);
    // res.json(arr);
  } catch (error) {
    console.error(error);
  }
});

app.post("/", (req, res) => {
  try {
    // console.log(req.body);
    res.json({ status: "succes" });
    res.send("got a post request");
  } catch (error) {
    console.error(error);
    res.json({ status: "failed" });
  }
});

app.listen(port, console.log(`server is listening on port ${port}`));
