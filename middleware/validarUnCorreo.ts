import { Request, Response, NextFunction } from 'express';
import emailValidator from 'email-validator';
import dns from 'dns';

const validarUnCorreo_mdw = async (req: Request, res: Response, next: NextFunction) => {
    const { correo } = req.body;

    // Validar si correo existe
    if (!correo) {
        return res.status(400).json({ error: 'Debe enviar un correo.' });
    }

    const correoNormalizado = correo.trim(); // Normalizamos el correo eliminando los espacios

    // Verificar si el correo tiene algún valor después de quitar los espacios
    if (!correoNormalizado) {
        return res.status(400).json({ error: 'El correo está vacío después de eliminar los espacios.' });
    }

    // Validar el formato del correo
    if (!emailValidator.validate(correoNormalizado)) {
        return res.status(400).json({ error: 'El correo tiene un formato inválido.' });
    }

    // Verificar el dominio del correo
    const dominio = correoNormalizado.split('@')[1];
    try {
        const addresses = await dns.promises.resolveMx(dominio);
        if (addresses.length === 0) {
            return res.status(400).json({ error: 'El correo tiene un dominio sin servidor de correo.' });
        }
    } catch (error) {
        return res.status(400).json({ error: 'Error al verificar el dominio del correo.' });
    }

    // Verificar si el correo tiene espacios
    const correoConEspacios = correo !== correoNormalizado; // Si el correo original tiene espacios
    if (correoConEspacios) {
        // Si tiene espacios, podemos devolver el mensaje adecuado, pero no guardamos nada
        return res.status(400).json({ error: 'El correo tiene espacios, no se permite.' });
    }

    // Si todo está correcto, pasamos a la siguiente etapa (controlador o siguiente middleware)
    next();
};

export default validarUnCorreo_mdw;
