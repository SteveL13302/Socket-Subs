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
const validarCorreos_mdw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { correos } = req.body;
    // Verificar que 'correos' sea un arreglo
    if (!Array.isArray(correos)) {
        return res.status(400).json({ error: 'Debe enviar una lista de correos.' });
    }
    const resultados = [];
    // Validar cada correo
    for (let i = 0; i < correos.length; i++) {
        let correo = correos[i].trim(); // Normalizamos el correo eliminando los espacios
        const resultado = { correo };
        if (!correo) {
            resultado.error = `El correo está vacío.`;
            resultados.push(resultado);
            continue;
        }
        // Validar el formato del correo
        if (!email_validator_1.default.validate(correo)) {
            resultado.error = `El correo tiene un formato inválido.`;
            resultados.push(resultado);
            continue;
        }
        // Verificar el dominio del correo
        const dominio = correo.split('@')[1];
        try {
            const addresses = yield dns_1.default.promises.resolveMx(dominio);
            if (addresses.length === 0) {
                resultado.error = `El correo tiene un dominio sin servidor de correo.`;
                resultados.push(resultado);
                continue;
            }
        }
        catch (error) {
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
});
exports.default = validarCorreos_mdw;
