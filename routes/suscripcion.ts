import { Router } from 'express';
import { suscribirseConProductos } from '../controllers/suscripcion';
import { obtenerContactos } from '../controllers/contactos';

const router = Router();

// Usar el middleware primero y luego el controlador
router.post('/registro-con-productos', suscribirseConProductos);

router.get('/contactos', obtenerContactos);

export default router;