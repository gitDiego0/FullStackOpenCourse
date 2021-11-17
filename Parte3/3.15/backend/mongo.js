const mongoose = require("mongoose");
if (process.argv.length < 3) {
  console.log(
    "Por favor provea la contraseña como argumento: node mongo.js <constraseña>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.vrpwn.mongodb.net/phone-book?retryWrites=true&w=majority`;

mongoose.connect(url);

const schema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", schema);

const person = new Person({
  name: name,
  number: number,
});

if (process.argv.length === 5) {
  person.save().then((result) => {
    console.log("persona guardada");
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
