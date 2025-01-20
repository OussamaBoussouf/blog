const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, require: true, min: 4, unique: true },
  password: { type: String, require: true },
});

const User = model("User", UserSchema);

module.exports = User;
