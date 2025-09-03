"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const verifyJWT = (req, res, next) => {
    var _a, _b;
    // leemos de cookie httpOnly o de header Authorization (por si un día lo usas)
    const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.auth_token) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', ''));
    if (!token)
        return res.status(401).json({ msg: 'No autenticado' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.auth = decoded; // guardar info en la request
        next();
    }
    catch (_c) {
        return res.status(401).json({ msg: 'Token inválido o expirado' });
    }
};
exports.verifyJWT = verifyJWT;
