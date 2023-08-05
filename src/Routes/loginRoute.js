const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("Users");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, isActive, createdOn, isEmailVerified } =
      req.body;

    if (!email || !password) {
      return res
        .status(401)
        .send({ error: "You must provide email and password" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).send({ error: "Please enter valid email!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .send({ error: "Password must be at 8 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({ error: "Email already exists" });
    }

    const user = new User({
      name,
      email,
      password,
      isActive,
      createdOn,
      isEmailVerified,
    });
    await user.save();
    res.status(201).send({ message: "signup successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .send({ error: "You must provide email and password" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).send({ error: "Please enter valid email!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .send({ error: "Password must be at 8 characters" });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      res.status(401).send({ error: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(401).send({ error: "Account is not active" });
    }
    return res.status(200).send({ message: "Login Successful" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const isValidEmail = (email) => {
  const regex = /^([a-zA-Z0-9_-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})$/;
  return regex.test(email);
};

module.exports = router;
