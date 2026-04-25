// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ================= APP SETUP =================
const app = express();
app.use(express.json());
app.use(cors());

// ================= DATABASE CONNECTION =================
// 👉 THIS CONNECTS MONGODB (PUT HERE ONLY)
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Error:", err));


// ================= SCHEMA =================
// 👉 STRUCTURE OF DATA IN DATABASE
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

// ================= MODEL =================
// 👉 COLLECTION NAME = users
const User = mongoose.model("User", userSchema);


// ================= ROUTES =================

// 👉 ADD USER
app.post("/addUser", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send("✅ User added successfully");
    } catch (err) {
        res.status(500).send("❌ Error saving user");
    }
});

// 👉 GET ALL USERS
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send("❌ Error fetching users");
    }
});


// ================= SERVER START =================
app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});