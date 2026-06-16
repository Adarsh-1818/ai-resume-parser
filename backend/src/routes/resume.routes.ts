import express from "express";
import { upload } from "../middleware/upload";
import { parseResume } from "../controllers/resume.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getHistory } from "../controllers/resume.controller";

const router = express.Router();

router.post("/parse", upload.single("file"), parseResume);
router.get("/history", authMiddleware, getHistory);

export default router;