


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";



//  post register user

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });
    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ error: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.json({ message: "Registered successfully" });
  } catch (e) {
    console.error("Registration error", e);
    res.status(500).json({ error: "Server error during registration" });
  }
};




// post login user
 
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (e) {
    console.error("Login error", e);
    res.status(500).json({ error: "Server error during login" });
  }
};














