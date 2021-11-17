const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
require("dotenv").config();

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
  Person.find({}).then((persons) => {
    response.json(persons);
  });
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

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  // console.log(JSON.stringify({ person }));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
