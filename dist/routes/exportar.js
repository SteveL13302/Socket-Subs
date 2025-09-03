"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exportar_1 = require("../controllers/exportar");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// GET /api/exportar/contactos
router.get('/excel_contactos', auth_1.verifyJWT, exportar_1.exportarContactosExcel);
exports.default = router;
