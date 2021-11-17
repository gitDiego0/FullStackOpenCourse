const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

console.log("conectando a ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("conectado a la base de datos");
  })
  .catch((err) => {
    console.log("error al conectar a la base de datos ", err.message);
  });

const schema = new mongoose.Schema({
  name: String,
  number: String,
});

// schema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model("Person", schema);
