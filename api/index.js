const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const salt = 10;

const PORT = process.env.PORT || 3000;
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

//
mongoose
  .connect("mongodb://localhost:27017/blog-app")
  .then(() => console.log("Connected Successfully to DB"))
  .catch((error) =>
    console.log("Something went wrong while connecting to DB", error)
  );

//middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

//routes
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userAlreadyExist = await User.findOne({ username: username });
    if (userAlreadyExist) {
      return res.status(409).json("user already exists");
    }
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username: username });
    if (!userDoc) {
      return res.status(400).json("invalid credentials");
    }
    const isValidPassword = bcrypt.compareSync(password, userDoc.password);
    if (isValidPassword) {
      const accessToken = jwt.sign(
        {
          username,
          id: userDoc._id,
        },
        PRIVATE_KEY
      );

      res.cookie("accessToken", accessToken, {}).json({
        username,
        id: userDoc._id,
      });
    } else {
      res.status(400).json("wrong password");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.post("/api/logout", (req, res) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    res.clearCookie("accessToken").end();
  } else {
    res.status(404).json("there is no accesstoken to clear");
  }
});

app.get("/api/refresh", async (req, res) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    const user = jwt.verify(accessToken, PRIVATE_KEY);
    res.status(200).json({ username: user.username, id: user.id });
  }
});

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
