// importeren van de events module
const Events = require('events');

// Event emitter is een class, dus we moeten een instantie maken van deze
const event = new Events();

// Hier maken we een event aan, en geven we een callback functie mee die uitgevoerd wordt als het event wordt aangeroepen
event.on('eventnaam', (args) => {
  // Hier loggen we de argumenten die we meegeven aan de emit
  console.log(args);
});

// Hier roepen we het event aan, en geven we een argument mee
event.emit('eventnaam', 'nodejs is cool');
