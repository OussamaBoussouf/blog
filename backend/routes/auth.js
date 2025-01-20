const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

//MODEL
const User = require("../models/User");

//CONSTANTS
const ACCESS_TOKEN_KEY = process.env.ACCESSTOKEN_PRIVATE_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESHTOKEN_PRIVATE_KEY;
const salt = 10;

//LOGIN AND REGISTER ROUTE
router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
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
        ACCESS_TOKEN_KEY,
        { expiresIn: "10min" }
      );

      const refreshToken = jwt.sign(
        {
          id: userDoc._id,
        },
        REFRESH_TOKEN_KEY,
        { expiresIn: "2 days" }
      );

      return res
        .status(200)
        .cookie("refreshToken", refreshToken)
        .header("x-access-token", accessToken)
        .json({
          username,
          id: userDoc._id,
        });
    } else {
      res.status(400).json("wrong password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/logout", cookieParser(), (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    res.clearCookie("refreshToken").end();
  } else {
    res.status(404).json("there is no refreshToken to clear");
  }
});

router.post("/refresh-token", cookieParser(), async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh Token required" });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_KEY, async (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "Invalid refresh token or refresh token expired",
      });
    }

    const userDoc = await User.findById({ _id: user.id });

    //Generate a new accessToken
    const accessToken = jwt.sign(
      {
        username: userDoc.username,
        id: userDoc._id,
      },
      ACCESS_TOKEN_KEY,
      { expiresIn: "10min" }
    );

    return res.status(200).header("x-access-token", accessToken).json({
      username: userDoc.username,
      id: userDoc._id,
    });
  });
});


module.exports = router;
