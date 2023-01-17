import express from 'express';
import { nanoid } from 'nanoid';
const PORT = 3000;
const app = express();

// Middleware voor alle routes
app.use(express.json());

// Middleware die je kan toevoegen aan bepaalde routes
function middlewareTest(req, res, next) {
  try {
    // Wanneer je hier een response zet gaat de request niet uitgevoerd worden.
    // Wanneer je next() zet gaat hier doorgaan naar de request.

    /*res.send({
      status: 'Login Failed',
    });*/
    next();
  } catch (error) {
    console.log(error);
  }
}
// Array Todo's fake db voor nu
const todos = [
  {
    id: nanoid(5),
    todo: 'F1 kijken',
    isCompleted: false,
  },
  {
    id: nanoid(5),
    todo: 'Groepswerk',
    isCompleted: true,
  },
];

// Route met custom middlewre toegevoegd
app.get('/', middlewareTest, (req, res) => {
  try {
    // connectie db / data opvragen
    res.send(todos);
  } catch (error) {
    console.error('error catch', error);
  }
});

// Route met params
app.get('/:id', (req, res) => {
  res.send(req.params);
});

// Post request waar we de body uit de request halen en loggen
app.post('/', (req, res) => {
  try {
    console.log(req.body);
    res.json({
      status: 'Succes',
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 'Failed',
    });
  }
});

// Server opstarten en loggen een bericht wanneer de server succesvol is opgestart
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`🚀 http://localhost:${PORT} 🚀`);
});
