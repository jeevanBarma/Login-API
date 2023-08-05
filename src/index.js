require("./Model/users");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const loginRoute = require("./Routes/loginRoute");
const app = express();

app.use(bodyParser.json());
app.use(loginRoute);

const mongoUri =
  "mongodb+srv://barmajeevan02:Jeevan02@cluster0.gri1jbq.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("mongodb connected sucessfully");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

app.listen(3007, () => {
  console.log("Server run at http://localhost:3007");
});
