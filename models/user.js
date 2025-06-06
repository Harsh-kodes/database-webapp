const mongoose = require("mongoose");

// Create the structure (schema) of a user
const userSchema = new mongoose.Schema({
  gmail: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Export the model to use it in server.js
module.exports = mongoose.model("User", userSchema);
