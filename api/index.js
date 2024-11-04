const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

const salt = 10;
const PAGE_LIMIT = 4;

const PORT = process.env.PORT || 3000;
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

//MODELS
const User = require("./models/User");
const Blog = require("./models/Blog");
const { isAuthor } = require("./middleware/auth");

//
mongoose
  .connect("mongodb://localhost:27017/blog-app")
  .then(() => console.log("Connected Successfully to DB"))
  .catch((error) =>
    console.log("Something went wrong while connecting to DB", error)
  );

//middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONT_LOCALHOST }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

//routes
app.post("/api/blog/create", upload.single("image"), (req, res) => {
  try {
    const image = req.file.filename;
    const { title, summary, content, user_id } = req.body;
    setTimeout(async () => {
      const blogPost = {
        title,
        summary,
        content,
        user_id,
        image,
      };
      const result = await Blog.create(blogPost);
      res.status(200).json(result);
    }, 1000);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/:id/edit", async (req, res) => {
  try {
    const blogId = req.params["id"];
    const result = await Blog.findById(blogId).populate();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/:id/blog", async (req, res) => {
  try {
    const blogId = req.params["id"];

    const result = await Blog.findById(blogId).populate("user_id");

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.put(
  "/api/:id/update",
  isAuthor,
  upload.single("image"),
  async (req, res) => {
    try {
      const image = req.file?.filename;
      const blogId = req.params["id"];
      const { title, summary, content } = req.body;
      const isBlogExist = await Blog.findById(blogId);

      if (!isBlogExist) {
        return res.status(404).json("Blog not found");
      }

      if (image) {
        const imagePath = path.join(
          __dirname,
          "./public/images/",
          isBlogExist.image
        );

        isBlogExist.set({
          title,
          summary,
          content,
          image,
        });

        const updatedBlog = await isBlogExist.save();

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log("Error occured while deleting the file: ", err);
          } else {
            console.log("File deleted successfully");
          }
        });

        setTimeout(() => res.status(200).json(updatedBlog), 1000);
      } else {
        isBlogExist.set({
          title,
          summary,
          content,
        });

        const updatedBlog = await isBlogExist.save();
        setTimeout(() => res.status(200).json(updatedBlog), 1000);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

app.get("/api/blogs", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let startIndex;
  let lastIndex;
  const results = {};
  try {
    const allBlogs = await Blog.find().populate("user_id");
    totalPages = Math.ceil(allBlogs.length / PAGE_LIMIT);
    if (totalPages < page) {
      startIndex = (totalPages - 1) * PAGE_LIMIT;
      lastIndex = totalPages * PAGE_LIMIT;
    } else {
      startIndex = (page - 1) * PAGE_LIMIT;
      lastIndex = page * PAGE_LIMIT;
    }
    const blogs = allBlogs.slice(startIndex, lastIndex);

    if (lastIndex < allBlogs.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
      };
    }

    results.totalPages = Math.ceil(allBlogs.length / PAGE_LIMIT);
    results.blogs = blogs;
    setTimeout(() => res.status(200).json(results), 1000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//LOGIN AND REGISTER ROUTE
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
