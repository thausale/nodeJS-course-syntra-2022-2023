// commonJS require(=import)
const { sayHello } = require('./modules');
const OS = require('os');
const path = require('path');
const fs = require('fs');
//-----------------------

// ES6 import methode -- LETOP: om deze te gebruiken moet je de type module in je package.json op module zetten
// import os from 'os';
// import path from 'path';
// import fs from 'fs';
// import { sayHello } from './modules';
//-----------------------

// Sayhello functie is geimporteerd van het modules bestand, waar we gezien hebben hoe we exports toepassen
sayHello('yoo Mehdi');

// Het gebruiken van de path node module, hier joine we de dirname(absolute path) met de node.txt file
console.log(path.join(__dirname, 'node.txt'));

// Sync readFile node module
const tekst = fs.readFileSync('./node.txt', 'utf8');
// Alles hieronder zal niet uitgevoerd worden tot de readFileSync klaar is met lezen
console.log('sync', tekst);

// Async readFile node module
// Hier zal alle code onder deze functie uitgevoerd worden, en pas als de readFile klaar is met lezen zal de callback functie uitgevoerd worden
fs.readFile('./node.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('async', data);
});

// Het gebruiken van de os node module, hier halen we de total memory, free memory en uptime op
console.log(`${(OS.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`${(OS.freemem() / 1024 / 1024 / 1024).toFixed(3)} GB`);
console.log(`${(OS.uptime() / 60 / 60).toFixed(0)} uur`);
