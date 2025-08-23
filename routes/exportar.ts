import { Router } from "express";
import { exportarContactosExcel } from "../controllers/exportar";

const router = Router();

// GET /api/exportar/contactos
router.get("/excel_contactos", exportarContactosExcel);

export default router;
