// import chalk from "chalk";
//Dev dependencies, npm i -D "nodename"
// zo komt het in de package json in devdependencies
//wat betekent dat die niet mee deployed wordt.
// console.log(chalk.blue("blauw"));
import { nanoid } from "nanoid";
import http from "http";
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

const server = http.createServer((req, res) => {
  res.setHeader("set-Cookie", "name=Niels; HttpOnly");
  res.writeHead(200, { "content-type": "application/json" });
  if (req.url === "/") {
    //data van de databank opvragen
    res.write(JSON.stringify(todos));
    res.end();
  }
  if (req.url === "/about") {
    res.write("ABOUT");
    res.end();
  }
});

function startApp() {
  try {
    server.listen(5000);
    console.log("server started");
  } catch {
    console.error("server failed");
  }
}

startApp();
//Server listen doet een server open op de poort die meegegeven wordt, hier 5000
//Met nodemon kan je server automatisch laten heropstarten
//Anders moet je manueel herstarten
