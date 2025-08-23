import express, { Application } from 'express';
import ValidacionRoutes from '../routes/suscripcion';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import database from '../database/connection';
import multer from 'multer'; // Importamos multer
import path from 'path'; // Para obtener la extensión de los archivos

class Server {

    private app: Application;
    private port: string;
    private paths = {
        suscipcion: '/api/suscripcion'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    // Configuración de Multer
    private upload = multer({
        storage: multer.diskStorage({
            // Cambiar el destino para las imágenes a 'public/assets/img'
            destination: function (req, file, cb) {
                if (file.fieldname === 'image') {
                    cb(null, 'public/assets/img'); // Carpeta donde se guardarán las imágenes
                } else {
                    cb(null, 'public/assets/doc'); // Para otros archivos (si tienes más)
                }
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname)); // Usar un nombre único para el archivo
            }
        })
    });

    // Método de conexión a la base de datos
    async dbConnection() {
        try {
            await database.authenticate(); // Verifica si la base de datos es accesible
            console.log('Database online');

            // Sincroniza los modelos con la base de datos
            await database.sync();  // Opcionalmente puedes usar `force: true` para eliminar las tablas y recrearlas
            console.log('Modelos sincronizados');
        } catch (error: any) {
            console.error('Error en la conexión a la base de datos:', error);
            throw new Error(error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura de JSON y de datos de formularios
        this.app.use(express.json()); // Para manejar datos JSON
        this.app.use(express.urlencoded({ extended: true })); // Para manejar datos de formularios (application/x-www-form-urlencoded)

        // Carpeta pública (agregada para que Multer guarde las imágenes en la carpeta pública)
        this.app.use(express.static('public'));
        this.app.use('/docs', express.static('docs'));  // Para que los archivos en docs sean públicos

}

    routes() {
        // Ahora pasamos la carga de archivo en la ruta de enviar correos
        this.app.use(this.paths.suscipcion, ValidacionRoutes);
              
    }

    listen() {
        // Desarrollo
        // this.app.listen(this.port, () => {
        //     console.log('Servidor corriendo en puerto ' + this.port);
        // });

        // Producción (opcional)
        const options = {
            key: fs.readFileSync('/etc/private/key/server_orel.key'),
            cert: fs.readFileSync('/etc/private/key/begroupec_tech_com.crt')
        };

        https.createServer(options, this.app).listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port + ' usando HTTPS');
        });
    }
}

export default Server;