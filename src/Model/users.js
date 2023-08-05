const mongoose = require("mongoose");

//in mongodb defaultly create id so i`m not creating userId in schema

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isActive: Boolean,
  createdOn: Date,
  isEmailVerified: Boolean,
});

mongoose.model("Users", userSchema);
