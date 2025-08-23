"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_validator_1 = __importDefault(require("email-validator"));
const dns_1 = __importDefault(require("dns"));
const validarUnCorreo_mdw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (!email_validator_1.default.validate(correoNormalizado)) {
        return res.status(400).json({ error: 'El correo tiene un formato inválido.' });
    }
    // Verificar el dominio del correo
    const dominio = correoNormalizado.split('@')[1];
    try {
        const addresses = yield dns_1.default.promises.resolveMx(dominio);
        if (addresses.length === 0) {
            return res.status(400).json({ error: 'El correo tiene un dominio sin servidor de correo.' });
        }
    }
    catch (error) {
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
});
exports.default = validarUnCorreo_mdw;
