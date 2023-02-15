import { Router } from "express";

import { SaleController } from "../controllers/SaleController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();
const saleController = new SaleController();

router.post("/upload", authenticateToken, saleController.upload);
router.get("/sales", authenticateToken, saleController.getSales);
router.delete("/sale/:id", authenticateToken, saleController.deleteSale);

export default router;
