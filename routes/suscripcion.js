"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suscripcion_1 = require("../controllers/suscripcion");
const router = (0, express_1.Router)();
// Usar el middleware primero y luego el controlador
router.post('/registro-con-productos', suscripcion_1.suscribirseConProductos);
exports.default = router;
