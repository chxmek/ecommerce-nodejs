const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

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

    // 2. check email in db (ดึงข้อมูลจากฐานข้อมูลผ่าน Prisma ORM เพื่อค้นหาผู้ใช้ (user) ในฐานข้อมูลที่มี email ตรงกับค่า email ที่ได้รับจาก request)
    const user = await prisma.user.findFirst({
      // find user by email
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
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exits" });
    }
    if (!user.enabled) {
      return res.status(403).json({ message: "User doesn't enable" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password invalid" });
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // generate jwt (3600 = 1hr.)
    jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, payload });
    });
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
