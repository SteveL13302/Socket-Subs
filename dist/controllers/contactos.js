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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerContactos = void 0;
const contacto_1 = __importDefault(require("../models/contacto"));
const SUPERUSER = ((_a = process.env.SUPERUSER) !== null && _a !== void 0 ? _a : 'socket_studio').toLowerCase();
const isSuperuser = (u) => !!u && u.toLowerCase() === SUPERUSER;
const obtenerContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const usuario = (_b = req.auth) === null || _b === void 0 ? void 0 : _b.usuario;
        // Superusuario ve todo; el resto se filtra por 'pagina = usuario'
        const where = isSuperuser(usuario) ? {} : { pagina: usuario };
        const contactos = yield contacto_1.default.findAll({
            where,
            order: [['id', 'ASC']],
        });
        return res.status(200).json({
            success: true,
            contactos: contactos.map(c => ({
                id: c.id,
                cedula: c.cedula,
                nombre_apellido: c.nombre_apellido,
                telefono: c.telefono,
                correo: c.correo,
                ciudad: c.ciudad,
                direccion: c.direccion,
                activo: c.activo,
                term_condi: c.term_condi,
                pagina: c.pagina,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt,
            })),
        });
    }
    catch (error) {
        console.error('Error al obtener contactos:', error);
        return res.status(500).json({
            success: false,
            message: 'Hubo un error al obtener los contactos.',
        });
    }
});
exports.obtenerContactos = obtenerContactos;
