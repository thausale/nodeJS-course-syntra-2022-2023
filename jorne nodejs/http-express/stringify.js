import { nanoid } from 'nanoid';

// JSON.stringify() is een functie die een JavaScript object omzet naar een JSON string.
// JSON.parse() is een functie die een JSON string omzet naar een JavaScript object.

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

const str = JSON.stringify(todos);
console.log('Stringify version', str);
console.log('Parsed version', JSON.parse(str));
