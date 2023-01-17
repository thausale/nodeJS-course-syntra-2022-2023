//met npm express kan je sneller en gemakkelijker uw server maken
import express, { json } from "express";
import { nanoid } from "nanoid";
const PORT = 5000;
const app = express();
const todos = [
  {
    id: nanoid(5),
    todo: "F1 Kijken",
    isCompleted: false,
  },
  {
    id: nanoid(5),
    todo: "groepswerk",
    isCompleted: true,
  },
];

//Keyword use wordt uitgevoerd op elke request, nu weet express dat het json moet zijn.
//Zal bijna standaard in de meeste dingen gebruikt worden. dit is middleware
//Dit zorgt voor header content type JSON
app.use(express.json());

function middlewareTest(req, res, next) {
  console.log("hello from middleware");

  //next is nodig om verder te gaan, anders blijft de request hangen
  //Dit is niet echt een functie die we veel gaan tegenkomen, is gewoon om
  //middleware te zien
  next();
}
//tussen de "/" en req,res kan je andere functies zetten zoals de middlewaretest
//zolang er een next() staat zodat het door kan gaan naar het volgend stuk
app.get("/", middlewareTest, (req, res) => {
  try {
    res.json(todos);
  } catch (error) {
    console.error(error);
  }
});

app.post("/", (req, res) => {
  try {
    console.log(req.body);
    res.json({ status: "succes" });
  } catch (error) {
    console.error(error);
    res.json({ status: "failed" });
  }
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
