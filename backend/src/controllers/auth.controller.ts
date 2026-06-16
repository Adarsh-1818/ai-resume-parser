import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { validatePassword } from "../utils/validatePassword";

export const register = async (req: any, res: any) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain 8+ chars, uppercase, lowercase, number, special char",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
      },
    });

    const token = generateToken(user.id);

    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};