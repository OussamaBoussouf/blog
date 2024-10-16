const { Schema, model } = require("mongoose");

const BlogSchema = new Schema({
  title: { type: String, require: true },
  summary: { type: String, require: true },
  image: { type: String, require: true },
  content: { type: String, require: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  created_at: {type: Date, default: Date.now}
});

const Blog = model("Blog", BlogSchema);

module.exports = Blog;
