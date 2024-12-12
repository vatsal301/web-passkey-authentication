const mongoose = require("mongoose");

const schema = mongoose.Schema({
  challenge: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  password: String,
});

module.exports = mongoose.model("challenge", schema);
