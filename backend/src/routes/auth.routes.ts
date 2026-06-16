import express from "express";
import { register, login } from "../controllers/auth.controller";
import { downloadReport } from "../controllers/resume.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/report/:id", authMiddleware, downloadReport);

export default router;