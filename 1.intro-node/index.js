//commonJS
const { fstat } = require("fs");
const OS = require("os");
const path = require("path");
//ES6
// import os from "os";

// fs.readFile("/een path hier", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(data);
//   }
// });
//asynchroon hierboven, 2de parameter van readFile is de callback, of de .then

console.log(OS.totalmem() / 1024 / 1024 / 1024);
console.log(path.dirname("/"));
// De console log van de readfiles zal onderaan de console komen
//Dit komt omdat het asynchroon is en de consoles zijn blocking code
// Wat zorgt dat die sneller worden uitgevoerd.

const Events = require("events");

const event = new Events();

event.on("tispauze", (args) => {
  console.log(args);
});

event.emit("tispauze", "pauze");

// Imported uit de modules.js als je console.log(module) doet krijg je
//veel info te zien, waaronder exports. in de modules.js wordt de
//sayHello functie mee in de exports gezet. waardoor je die hier kan gebruiken

const { sayHello } = require("./modules");

sayHello("testing modules ");
