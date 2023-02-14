import { Router } from "express";

import { UploadController } from "../controllers/UploadController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();
const uploadController = new UploadController();

router.post("/upload", authenticateToken, uploadController.upload);

export default router;
