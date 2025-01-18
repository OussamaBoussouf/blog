const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

//OPTIONS
const upload = multer({ storage: storage });

//CONSTANTS
const PAGE_LIMIT = 4;

//MODELS
const Blog = require("../models/Blog");

//
const { authenticateToken } = require("../middleware/auth");

router.post(
  "/blog/create",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
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
  }
);

router.get("/:id/edit", authenticateToken, async (req, res) => {
  try {
    const blogId = req.params["id"];
    const result = await Blog.findById(blogId).populate();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id/blog", async (req, res) => {
  try {
    const blogId = req.params["id"];

    const result = await Blog.findById(blogId).populate("user_id");

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.put(
  "/:id/update",
  authenticateToken,
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

        res.status(200).json(updatedBlog);
      } else {
        isBlogExist.set({
          title,
          summary,
          content,
        });

        const updatedBlog = await isBlogExist.save();
        res.status(200).json(updatedBlog);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get("/blogs", async (req, res) => {
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
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
