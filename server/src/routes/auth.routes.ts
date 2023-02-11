import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticateToken, authController.me);

export default router;
