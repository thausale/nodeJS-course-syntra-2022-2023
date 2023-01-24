import { client } from "./db.js";

export const moviesClient = client.db("syntra").collection("movies");
