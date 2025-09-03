"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suscripcion_1 = require("../controllers/suscripcion");
const contactos_1 = require("../controllers/contactos");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Usar el middleware primero y luego el controlador
router.post('/registro-con-productos', suscripcion_1.suscribirseConProductos);
router.get('/contactos', auth_1.verifyJWT, contactos_1.obtenerContactos);
exports.default = router;
