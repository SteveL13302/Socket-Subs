import { Request, Response, NextFunction } from 'express';
import emailValidator from 'email-validator';
import dns from 'dns';

const validarCorreos_mdw = async (req: Request, res: Response, next: NextFunction) => {
    const { correos } = req.body;

    // Verificar que 'correos' sea un arreglo
    if (!Array.isArray(correos)) {
        return res.status(400).json({ error: 'Debe enviar una lista de correos.' });
    }

    const resultados: any[] = [];

    // Validar cada correo
    for (let i = 0; i < correos.length; i++) {
        let correo = correos[i].trim(); // Normalizamos el correo eliminando los espacios

        const resultado: any = { correo };

        if (!correo) {
            resultado.error = `El correo está vacío.`;
            resultados.push(resultado);
            continue;
        }

        // Validar el formato del correo
        if (!emailValidator.validate(correo)) {
            resultado.error = `El correo tiene un formato inválido.`;
            resultados.push(resultado);
            continue;
        }

        // Verificar el dominio del correo
        const dominio = correo.split('@')[1];
        try {
            const addresses = await dns.promises.resolveMx(dominio);
            if (addresses.length === 0) {
                resultado.error = `El correo tiene un dominio sin servidor de correo.`;
                resultados.push(resultado);
                continue;
            }
        } catch (error) {
            resultado.error = `Error al verificar el dominio del correo.`;
            resultados.push(resultado);
            continue;
        }

        // Verificar si el correo tiene espacios
        const correoConEspacios = correos[i] !== correo;
        if (correoConEspacios) {
            resultado.error = `El correo tiene espacios, no se permite.`;
            resultados.push(resultado);
            continue;
        }

        // Si el correo es válido, lo marcamos como válido
        resultado.estado = 'Válido';
        resultados.push(resultado);
    }

    // Guardar los resultados en `res.locals` para pasarlos al siguiente middleware/controlador
    res.locals.resultados = resultados;

    // Continuar con el siguiente middleware o controlador
    next();
};

export default validarCorreos_mdw;
