import express from "express";
import { connect } from "./database/db.js";
import { moviesClient } from "./database/collections.js";
import { ObjectId } from "mongodb";
import bodyParser from "body-parser";

//We maken standaard met express weer een HTTP server
const app = express();
const port = 3000;
// we zeggen tegen express dat ze json files moet gebruiken
//.json is blijkbaar built in middleware
app.use(express.json());
const jsonParser = bodyParser.json();
//Filter function

//Get all route

app.get("/", async (req, res) => {
  try {
    //We get the title out of the query
    const { title } = req.query;
    //We get the movies from the movieClient
    const movies = await moviesClient.find({}).toArray();
    //first we check for an exact match
    if (title) {
      const filterWord = title.toLowerCase();
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filterWord)
      );
      //If there is an exact match, we return it
      if (filtered.length > 0) {
        console.log(filtered);
        return res.status(200).json(filtered);
      }
      //If there is no exact match we make a regex out of the input title
      let pattern = title
        .split("")
        .map((x) => `(?=.*${x})`)
        .join("");
      //This will give a regex in this format, example for borat:
      //(?=.*b)(?=.*o)(?=.*r)(?=.*t)(?=.*a)
      //Short explanation, it will look for titles in the moviesClient
      //With those characters in any order.
      //The ?= is a positive lookahead, meaning it will start at the first character
      //and go through the string untill it finished the regex i think.
      //For the(?=.*b) it will start at the first character, the b, and be satisfied because
      //It's a match. It will then continue looking for the o
      //The .*; the . means any character is allowed and the * means 0 or more times.
      //So if it's the first character, the .* will still match because of the *
      //if it's the 5th character the first 4 characters will match because
      //of the ., it's allowed to be any character

      const regex = new RegExp(`${pattern}`, "g");
      console.log(pattern);
      console.log(regex);
      const regexMovie = movies.filter((movie) => {
        const title = movie.title;
        return title.match(regex);
      });
      console.log(regexMovie);
      return res.status(200).json(regexMovie);
    }
  } catch (error) {
    console.error(error);
  }
});

//Get by id
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesClient.findOne({ _id: ObjectId(id) });
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
  }
});

app.post("/", async (req, res) => {
  try {
    const { title, releaseyear, actors } = req.body;
    const result = await moviesClient.insertOne({
      title,
      releaseyear,
      actors,
    });
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, releaseyear, actors } = req.body;

    if (title !== null) {
      await moviesClient.updateOne({ _id: ObjectId(id) }, { $set: { title } });
    }
    if (releaseyear !== null) {
      await moviesClient.updateOne(
        { _id: ObjectId(id) },
        { $set: { releaseyear } }
      );
    }
    if (actors !== null) {
      await moviesClient.updateOne({ _id: ObjectId(id) }, { $set: { actors } });
    }

    // const result = await moviesClient.updateOne(
    //   { _id: ObjectId(id) },
    //   { $set: { title, releaseyear } }
    //   //   { releaseyear },
    //   //   { actors }
    // );
    res.status(200).send("Great succes!");
  } catch {}
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await moviesClient.deleteOne({ _id: ObjectId(id) });
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

//Functie om server te starten en te runnen
(async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
