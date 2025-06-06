// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://harsh:harsh1907@harsh.yjbmago.mongodb.net/?retryWrites=true&w=majority&appName=harsh", {
  // These options are no longer needed for Mongoose v7+
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  gmail: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// ✅ Register Route
app.post("/register", async (req, res) => {
  const { name, gmail, username, password } = req.body;

  try {
    const newUser = new User({ name, gmail, username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).json({
        message: "Login successful!",
        user: {
          name: user.name,
          gmail: user.gmail,
          username: user.username,
        }
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // ✅ Send full user info
  res.status(200).json({
    message: 'Login successful',
    user: {
      gmail: user.gmail,
      username: user.username,
      password: user.password  // Avoid sending password in real apps, but okay for now
    }
  });
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { _id: 0, gmail: 1, username: 1 });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get all users route
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude passwords from output
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
