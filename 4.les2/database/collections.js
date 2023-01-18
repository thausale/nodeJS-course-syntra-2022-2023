import { client } from "./db.js";

const todoClient = client.db("syntra").collection("todos");

export { todoClient };
