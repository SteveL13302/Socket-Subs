import { Router } from "express";
import { exportarContactosExcel } from "../controllers/exportar";
import { verifyJWT } from '../middleware/auth';

const router = Router();

// GET /api/exportar/contactos
router.get('/excel_contactos', verifyJWT, exportarContactosExcel);

export default router;
