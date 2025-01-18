const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

//ROUTES
const auth = require("./routes/auth");
const blog = require("./routes/blog");

//
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected Successfully to DB"))
  .catch((error) => {
    console.log("Something went wrong while connecting to DB", error);
    process.exit(1);
  });

//middleware
app.use(
  cors({
    credentials: true,
    preflightContinue: true,
    origin: process.env.FRONT_LOCALHOST,
    exposedHeaders: "x-access-token",
  })
);
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

//routes
app.use("/api/auth", auth);
app.use("/api", blog);

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
