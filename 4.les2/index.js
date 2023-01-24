import express from "express";
import { connect } from "./database/db.js";
import { todoClient } from "./database/collections.js";
import { ObjectId } from "mongodb";

const app = express();
const port = 3000;
const endpoint = "/api/v1/todos";
app.use(express.json());

const middleware = (req, res, next) => {
  console.log("Hello from middleware");
  next();
};

app.get(endpoint, async (req, res) => {
  try {
    const todos = await todoClient.find({}).toArray();
    res.json(todos);
  } catch (error) {
    console.error(error);
  }
});

app.get(`${endpoint}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    //Objectid is een functie van mongodb om de id om te zetten
    //naar de objectid format van mongodb
    const todo = await todoClient.findOne({ _id: ObjectId(id) });
    //als je zou willen dat je alle info krijgt als er een
    //id wordt meegeven die niet bestaat moet je zeker
    //een return doen, anders gaat hij verder hieronder
    //En de res.json(todo[0]) ook uitvoeren.
    // if (todo.length === 0) {
    //   return res.json(data);
    //   throw new Error("todo bestaat niet!!!");
    // }
    res.status(200).json(todo);
  } catch (error) {
    //De message is wat er in de throw wordt meegegeven
    res.json({ status: "failed", message: error.message });
    console.error(error);
  }
});

app.put(`${endpoint}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const result = await todoClient.updateOne(
      { _id: ObjectId(id) },
      { $set: { completed } }
    );
    //Put is een update van een waarde, we gaan dit atm niet
    //uitwerken want das ambetant met een locale array
    //Correcte todo ophalen
    //deze updaten met de data uit de body
    //eventueel alle todos terugsturen
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
});

//We faken de delete omdat dat niet praktisch is op de locale array
app.delete(`${endpoint}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoClient.deleteOne({ _id: ObjectId(id) });
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.post(endpoint, async (req, res) => {
  try {
    //We pakken de body en halen er id en text uit
    const { text } = req.body;
    //toevoegen aan db
    const result = await todoClient.insertOne({ todo: text, completed: false });
    /*{
    "acknowledged": true,
    "insertedId": "63c7fef04b9eb3572cee006d"
}*/
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

//Je kan IIFE toepassen hierop, dan wordt de functie meteen uitgevoerd
//dan wordt het onderstaand, de functie moet niet benoemd worden
//Maar kan ook niet geëxporteerd worden

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
