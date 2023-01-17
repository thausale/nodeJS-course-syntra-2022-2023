import http from 'http';
import { nanoid } from 'nanoid';
const PORT = 3000;

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

const server = http.createServer((req, res) => {
  res.setHeader('Set-Cookie', 'name=Jorne; HttpOnly');
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/') {
    // Data van de db opvragen
    res.write(JSON.stringify(todos));
    res.end();
  }
  if (req.url === '/about') {
    res.write('ABOUT');
    res.end();
  }
});

function startApp() {
  try {
    server.listen(PORT);
    console.log(`Server started @ port ${PORT}`);
    console.log(`🚀 http://localhost:${PORT} 🚀`);
  } catch (error) {
    console.error(error);
  }
}
startApp();
