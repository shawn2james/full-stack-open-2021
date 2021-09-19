const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3001;

morgan.token('body', (req) => JSON.stringify(req.body));

const morganFormat = (tokens, req, res) => {
  let log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms',
  ]

  if(req.method=="POST") {
    log.push(tokens.body(req));
  } 

  return log.join(' ');
}

app.use(express.json());
app.use(morgan(morganFormat));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
})

app.get('/info', (req, res) => {
  const info = `Phonebook has info for ${persons.length} people`;
  const date =  new Date();
  res.send(`${info}<br><br>${date}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if(person) {
    res.json(person);
  } else {
    res.statusMessage = `person ${id}doesn't exist in server`;
    res.status(404).end();
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const names = persons.map(p => p.name);

  if(!body.name || !body.number) {
    return res.status(400).json({
      "error": "sufficient information not provided"
    });
  } else if(names.includes(body.name)) {
      return res.status(400).json({
        "error": "name must be unique"
      })
  }

  const person = {
    id: Math.floor(Math.random() * 500),
    name: body.name,
    number: Number(body.number),
  }

  persons = persons.concat(person);
  res.status(200).end();
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if(person) {
    persons = persons.filter(p => p.id !== id);
    res.statusMessage = `person ${id} deleted successfully`;
    res.status(204).end();
  } else {
    res.statusMessage = `person ${id} doesn't exist in server`;
    res.status(404).end();
  }
})

const unknownEndPoint = (req, res) => {
  res.status(404).json({
    "error": "unknown endpoint"
  })
};
app.use(unknownEndPoint);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})
