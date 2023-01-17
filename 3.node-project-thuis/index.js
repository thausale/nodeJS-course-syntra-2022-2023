import http from "http";
import { nanoid } from "nanoid";
import chalk from "chalk";
import express, { json } from "express";
import { URL } from "url";

const app = express();
const port = 8889;

app.use(express.json());

//Op deze manier doe je een query en moet je bij de url /?id=52 doen
// app.get("/", (req, res) => {
//   try {
//     const arr = req.query.id;
//     console.log(req.query.id);
//     res.json(req.query.id);
//     // res.json(arr);
//   } catch (error) {
//     console.error(error);
//   }
// });

//Op deze manier werk je met parameter en die je bij de url /52
app.get("/:id", (req, res) => {
  try {
    const value = req.params.id;
    console.log(req.params);
    res.json(value);
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
