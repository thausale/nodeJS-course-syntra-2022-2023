import { Movie } from "../models/MovieSchema.js";

const getAllMovies = async (req, res) => {
  try {
    //We get the title out of the query
    const { title } = req.query;
    //We get the movies from the movieClient
    const movies = await Movie.find();
    //first we check for an exact match
    if (title) {
      const filterWord = title.toLowerCase();
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filterWord)
      );
      if (filtered.length > 0) {
        return res.status(200).json(filtered);
      }
      let pattern = title
        .split("")
        .map((x) => `(?=.*${x})`)
        .join("");

      const regex = new RegExp(`${pattern}`, "g");

      const regexMovie = movies.filter((movie) => {
        return movie.title.match(regex);
      });
      return res.status(200).json(regexMovie);
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
  }
};

const postMovie = async (req, res) => {
  try {
    const { title, releaseyear, actors, poster } = req.body;
    const result = await Movie.create({
      title,
      releaseyear,
      actors,
      poster,
    });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, releaseyear, actors, poster } = req.body;
    const result = await Movie.replaceOne(
      { _id: id },
      {
        title,
        releaseyear,
        actors,
        poster,
      }
    );

    res.status(200).send("Great succes!");
  } catch (error) {
    console.error(error);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Movie.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

export { getAllMovies, getMovieById, postMovie, updateMovie, deleteMovie };
