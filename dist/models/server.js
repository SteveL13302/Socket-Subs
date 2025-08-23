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
const express_1 = __importDefault(require("express"));
const suscripcion_1 = __importDefault(require("../routes/suscripcion"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const connection_1 = __importDefault(require("../database/connection"));
const multer_1 = __importDefault(require("multer")); // Importamos multer
const path_1 = __importDefault(require("path")); // Para obtener la extensión de los archivos
class Server {
    constructor() {
        this.paths = {
            suscipcion: '/api/suscripcion'
        };
        // Configuración de Multer
        this.upload = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                // Cambiar el destino para las imágenes a 'public/assets/img'
                destination: function (req, file, cb) {
                    if (file.fieldname === 'image') {
                        cb(null, 'public/assets/img'); // Carpeta donde se guardarán las imágenes
                    }
                    else {
                        cb(null, 'public/assets/doc'); // Para otros archivos (si tienes más)
                    }
                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + path_1.default.extname(file.originalname)); // Usar un nombre único para el archivo
                }
            })
        });
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // Método de conexión a la base de datos
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate(); // Verifica si la base de datos es accesible
                console.log('Database online');
                // Sincroniza los modelos con la base de datos
                yield connection_1.default.sync(); // Opcionalmente puedes usar `force: true` para eliminar las tablas y recrearlas
                console.log('Modelos sincronizados');
            }
            catch (error) {
                console.error('Error en la conexión a la base de datos:', error);
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura de JSON y de datos de formularios
        this.app.use(express_1.default.json()); // Para manejar datos JSON
        this.app.use(express_1.default.urlencoded({ extended: true })); // Para manejar datos de formularios (application/x-www-form-urlencoded)
        // Carpeta pública (agregada para que Multer guarde las imágenes en la carpeta pública)
        this.app.use(express_1.default.static('public'));
        this.app.use('/docs', express_1.default.static('docs')); // Para que los archivos en docs sean públicos
    }
    routes() {
        // Ahora pasamos la carga de archivo en la ruta de enviar correos
        this.app.use(this.paths.suscipcion, suscripcion_1.default);
    }
    listen() {
        // Desarrollo
        // this.app.listen(this.port, () => {
        //     console.log('Servidor corriendo en puerto ' + this.port);
        // });
        // Producción (opcional)
        const options = {
            key: fs_1.default.readFileSync('/etc/private/key/server_orel.key'),
            cert: fs_1.default.readFileSync('/etc/private/key/begroupec_tech_com.crt')
        };
        https_1.default.createServer(options, this.app).listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port + ' usando HTTPS');
        });
    }
}
exports.default = Server;
