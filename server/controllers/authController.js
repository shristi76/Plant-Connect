import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  try {
    const { name, email, password, city, lat, lng, role } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      city,
      role: role || "user",
      location: { type: "Point", coordinates: [lng || 0, lat || 0] },
    });

    res.status(201).json({
      token: signToken(user._id),
      user: { id: user._id, name, email, city, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      token: signToken(user._id),
      user: { id: user._id, name: user.name, email, city: user.city, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const me = async (req, res) => res.json(req.user);