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
exports.me = exports.logout = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarios_1 = require("../models/usuarios");
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '8h';
// Si estás detrás de Nginx con HTTPS en producción,
// necesitas SameSite=None + Secure para cookies cross-site.
const IS_PROD = process.env.NODE_ENV === 'production';
const COOKIE_OPTS = {
    httpOnly: true,
    path: '/',
    maxAge: 1000 * 60 * 60 * 8,
    sameSite: IS_PROD ? 'none' : 'lax',
    secure: IS_PROD, // obligatorio cuando sameSite = 'none'
    // domain: 'subs.socket-studio.com', // opcional: deja comentado a menos que lo necesites
};
function signToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({ msg: 'Faltan credenciales' });
    }
    try {
        // Busca por usuario (ajusta si quisieras permitir email también)
        const u = yield usuarios_1.Usuario.findOne({ where: { usuario: user } });
        if (!u)
            return res.status(401).json({ msg: 'Usuario o contraseña incorrectos' });
        const ok = yield bcryptjs_1.default.compare(password, u.getDataValue('pwd'));
        if (!ok)
            return res.status(401).json({ msg: 'Usuario o contraseña incorrectos' });
        const token = signToken({
            id: u.getDataValue('id'),
            usuario: u.getDataValue('usuario'),
        });
        // Set-Cookie: auth_token=...; HttpOnly; SameSite=None; Secure
        res.cookie('auth_token', token, COOKIE_OPTS);
        // Devolver info pública del usuario
        const { id, usuario, empresa, logo, user_mail, host_mail, port_mail, nombre_empresa, } = u.get();
        return res.json({
            user: { id, usuario, empresa, logo, user_mail, host_mail, port_mail, nombre_empresa },
        });
    }
    catch (e) {
        console.error('[auth/login] error:', e);
        return res.status(500).json({ msg: 'Error en login' });
    }
});
exports.login = login;
const logout = (_req, res) => {
    // Para que borre la cookie, las opciones deben coincidir (path, sameSite, secure, domain si aplica)
    res.clearCookie('auth_token', COOKIE_OPTS);
    return res.json({ ok: true });
};
exports.logout = logout;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        return res.status(401).json({ msg: 'No autenticado' });
    const u = yield usuarios_1.Usuario.findByPk(userId, {
        attributes: { exclude: ['pwd', 'password_mail'] },
    });
    if (!u)
        return res.status(401).json({ msg: 'No autenticado' });
    return res.json({ user: u });
});
exports.me = me;
