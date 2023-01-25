import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    required: true,
  },
  releaseyear: {
    type: String,
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
});

export const Movie = mongoose.model("Movie", MovieSchema);
