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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connection_1 = __importDefault(require("../database/connection"));
const usuarios_1 = require("../models/usuarios"); // ajusta la ruta si tus modelos están en otro sitio
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        console.log('Conectado a DB');
        const base = {
            user_mail: 'facturaelect@misdocumentoselectronicos.com',
            password_mail: 'M@rlon2025',
            host_mail: 'smtp.hostinger.com',
            port_mail: 465,
            nombre_empresa: 'SocketStudio',
        };
        const users = [
            { usuario: 'socket_studio', empresa: 'Socket studio', logo: 'https://socket-studioec.com/img/logo/logo2.png', plain: 'admin' },
            { usuario: 'consu_lapo', empresa: 'Consu Lapo', logo: 'https://mislogos.com/consulapo.png', plain: 'consu_lapo123' },
            { usuario: 'agepro', empresa: 'Agepro S.A.', logo: 'https://mislogos.com/agepro.png', plain: 'agepro123' },
        ];
        for (const u of users) {
            const hash = yield bcryptjs_1.default.hash(u.plain, 10);
            yield usuarios_1.Usuario.upsert(Object.assign(Object.assign(Object.assign({}, base), u), { pwd: hash }));
        }
        console.log('Usuarios insertados/actualizados con hash bcrypt');
        process.exit(0);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}))();
