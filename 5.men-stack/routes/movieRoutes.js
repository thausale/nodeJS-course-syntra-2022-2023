import express from "express";
import { Movie } from "../models/MovieSchema.js";
import {
  getAllMovies,
  getMovieById,
  deleteMovie,
  postMovie,
  updateMovie,
} from "../controllers/movieController.js";

const rout = express.Router();

rout.get("/", getAllMovies);

rout.get("/:id", getMovieById);

rout.post("/", postMovie);

rout.put("/:id", updateMovie);

rout.delete("/:id", deleteMovie);

export default rout;
