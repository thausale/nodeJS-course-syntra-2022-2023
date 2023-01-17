// Simpele functie om te leren variabelen te exporteren in de module
function zegHallo(bericht) {
  console.log(bericht);

  // De log van het exports object dat in de module van node zit
  console.log(module.exports);
}

// Manier van exporteren, dit is een object, en we kunnen hier meerdere functies of variablen in stoppen.
// Onderstaande 2 manieren zijn exact het zelfde.

module.exports.sayHello = zegHallo;
//module.exports = { sayHello: zegHallo }
