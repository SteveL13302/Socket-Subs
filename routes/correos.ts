import { Router } from 'express';
import { verifyJWT } from '../middleware/auth';
import { actualizarConfigSMTP, enviarCorreo, obtenerConfigSMTP } from '../controllers/envio_correos';

const router = Router();

// Usar el middleware primero y luego el controlador
router.get('/configSMTP', verifyJWT, obtenerConfigSMTP);

router.put('/actualizar_configSMTP', verifyJWT, actualizarConfigSMTP);

router.post('/enviarCorreo', verifyJWT, enviarCorreo);

export default router;