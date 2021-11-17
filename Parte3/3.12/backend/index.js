const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const requestLogger = (request, response, next) => {
  console.log("Body:  ", request.body);
  next();
};

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(":method :status :param[id] :res[content-length] - :response-time ms")
);
// app.use(requestLogger);

morgan.token("param", function (req, res, param) {
  return console.log(req.body);
});

let persons = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

const checkName = (name) => {
  if (persons.some((p) => p.name === name)) {
    return true;
  } else {
    return false;
  }
};

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  const nPersons = persons.length;
  const date = new Date();
  response.send(`Phone book has info for ${nPersons} people ${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (!checkName(body.name)) {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };

    persons = persons.concat(person);

    response.json(person);
    // console.log(JSON.stringify({ person }));
  } else {
    return response.status(400).json({ error: "name must be unique" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
