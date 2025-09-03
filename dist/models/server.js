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
// BACKEND: src/models/server.ts
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const suscripcion_1 = __importDefault(require("../routes/suscripcion"));
const exportar_1 = __importDefault(require("../routes/exportar"));
const auth_1 = __importDefault(require("../routes/auth"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = __importDefault(require("../database/connection"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// import fs from 'fs';
// import https from 'https';
class Server {
    constructor() {
        this.paths = {
            suscripcion: "/api/suscripcion",
            exportar: "/api/exportar",
            auth: "/api/auth",
        };
        // Configuración de Multer
        this.upload = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                destination: function (req, file, cb) {
                    if (file.fieldname === "image")
                        cb(null, "public/assets/img");
                    else
                        cb(null, "public/assets/doc");
                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + path_1.default.extname(file.originalname));
                },
            }),
        });
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3002";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // Conexión a la base de datos
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Database online");
                yield connection_1.default.sync();
                console.log("Modelos sincronizados");
            }
            catch (error) {
                console.error("Error en la conexión a la base de datos:", error);
                throw new Error(error);
            }
        });
    }
    middlewares() {
        const allowlist = (process.env.ALLOWED_ORIGINS || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        const corsOpts = {
            origin(origin, cb) {
                if (!origin || allowlist.includes(origin))
                    return cb(null, true);
                return cb(new Error(`Origin ${origin} no permitido por CORS`));
            },
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        };
        this.app.use((0, cors_1.default)(corsOpts));
        this.app.options("*", (0, cors_1.default)(corsOpts)); // ← Responde preflight OPTIONS
        this.app.set('trust proxy', 1);
        // Cookies httpOnly
        this.app.use((0, cookie_parser_1.default)());
        // Parseo de body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Archivos estáticos
        this.app.use(express_1.default.static("public"));
        this.app.use("/docs", express_1.default.static("docs"));
    }
    routes() {
        // Rutas de negocio
        this.app.use(this.paths.suscripcion, suscripcion_1.default);
        this.app.use(this.paths.exportar, exportar_1.default);
        // Rutas de autenticación (login, logout, me)
        this.app.use(this.paths.auth, auth_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
        // Producción HTTPS (opcional)
        // const options = {
        //   key: fs.readFileSync('/etc/private/key/server_orel.key'),
        //   cert: fs.readFileSync('/etc/private/key/begroupec_tech_com.crt'),
        // };
        // https.createServer(options, this.app).listen(this.port, () => {
        //   console.log('Servidor HTTPS en puerto ' + this.port);
        // });
    }
}
exports.default = Server;
