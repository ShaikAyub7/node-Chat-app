const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  username: {
    type: String,
  },
  message: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chats", chatSchema);
