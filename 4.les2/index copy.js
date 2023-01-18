import express from "express";
import { connect } from "./database/db.js";

const app = express();
const port = 3000;
const endpoint = "/api/v1/todos";
app.use(express.json());

const middleware = (req, res, next) => {
  console.log("Hello from middleware");
  next();
};

const data = [
  {
    id: 1,
    todo: "nodeJS leren",
    completed: false,
  },
  {
    id: 2,
    todo: "php leren",
    completed: true,
  },
  {
    id: 3,
    todo: "JS leren",
    completed: false,
  },
];

app.get(endpoint, middleware, (req, res) => {
  try {
    if (req.query.completed) {
      const completedTodos = data.filter((item) => {
        return item.completed.toString() == req.query.completed;
      });
      return res.json(completedTodos);
      console.log(data[0].completed);
      console.log(completedTodos);
      console.log(req.query.completed);
    }
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

app.get(`${endpoint}/:id`, (req, res) => {
  try {
    const { id } = req.params;
    const todo = data.filter((item) => item.id === +id);
    console.log(todo);
    if (todo.length === 0) {
      //als je zou willen dat je alle info krijgt als er een
      //id wordt meegeven die niet bestaat moet je zeker
      //een return doen, anders gaat hij verder hieronder
      //En de res.json(todo[0]) ook uitvoeren.
      return res.json(data);
      throw new Error("todo bestaat niet!!!");
    }
    res.json(todo[0]);
  } catch (error) {
    //De message is wat er in de throw wordt meegegeven
    res.json({ status: "failed", message: error.message });
    console.error(error);
  }
});

app.put(`${endpoint}/:id`, (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    console.log(req.body);
    //Put is een update van een waarde, we gaan dit atm niet
    //uitwerken want das ambetant met een locale array
    //Correcte todo ophalen
    //deze updaten met de data uit de body
    //eventueel alle todos terugsturen
    res.json({ body: req.body });
  } catch (error) {
    console.error(error);
  }
});

//We faken de delete omdat dat niet praktisch is op de locale array
app.delete(`${endpoint}/:id`, (req, res) => {
  try {
    const { id } = req.params;
    const todo = data.filter((item) => item.id !== +id);
    res.json(todo);
  } catch (error) {
    console.error(error);
  }
});

app.post(endpoint, (req, res) => {
  try {
    //We pakken de body en halen er id en text uit
    const { id, text } = req.body;
    //toevoegen aan db
    const newArray = data.push({ id, todo: text, completed: false });
    res.json(newArray);
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
