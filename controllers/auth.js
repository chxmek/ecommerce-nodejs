const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. validate body
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // 2. check email in db
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "Email already exits" });
    }

    // 3. hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 4. register
    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });
    res.send("Register success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    res.send("Hello Login");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    res.send("Hello Current User");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
