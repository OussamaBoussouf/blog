const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

exports.isAuthor = async (req, res, next) => {
  const { accessToken } = req.cookies;
  const user = jwt.verify(accessToken, PRIVATE_KEY);
  const isBlogExist = await Blog.findById(req.params["id"]);
  console.log(isBlogExist?.user_id.toString(), user.id);

  if (isBlogExist?.user_id.toString() === user.id) {
    next();
  } else {
    res.status(401).send("You are Unauthorized to perform this action");
  }
};
