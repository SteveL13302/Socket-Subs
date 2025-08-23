import { Router } from 'express';
import { suscribirseConProductos } from '../controllers/suscripcion';

const router = Router();

// Usar el middleware primero y luego el controlador
router.post('/registro-con-productos', suscribirseConProductos);

export default router;