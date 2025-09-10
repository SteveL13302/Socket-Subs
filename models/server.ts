// BACKEND: src/models/server.ts
import "dotenv/config";
import express, { Application } from "express";

import SuscripcionRoutes from "../routes/suscripcion";
import ExportarRoutes from "../routes/exportar";
import authRouter from "../routes/auth";
import correosRouter from "../routes/correos";

import cors from "cors";
import cookieParser from "cookie-parser";
import database from "../database/connection";
import multer from "multer";
import path from "path";
// import fs from 'fs';
// import https from 'https';

class Server {
  private app: Application;
  private port: string;
  private paths = {
    suscripcion: "/api/suscripcion",
    exportar: "/api/exportar",
    auth: "/api/auth",
    correos: "/api/correos",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3002";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  // Configuración de Multer
  private upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        if (file.fieldname === "image") cb(null, "public/assets/img");
        else cb(null, "public/assets/doc");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
  });

  // Conexión a la base de datos
  async dbConnection() {
    try {
      await database.authenticate();
      console.log("Database online");
      await database.sync();
      console.log("Modelos sincronizados");
    } catch (error: any) {
      console.error("Error en la conexión a la base de datos:", error);
      throw new Error(error);
    }
  }

  middlewares() {
    const allowlist = (process.env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const corsOpts: cors.CorsOptions = {
      origin(origin, cb) {
        if (!origin || allowlist.includes(origin)) return cb(null, true);
        return cb(new Error(`Origin ${origin} no permitido por CORS`));
      },
      credentials: true, // necesario si usas cookies (login)
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    };

    this.app.use(cors(corsOpts));
    this.app.options("*", cors(corsOpts)); // ← Responde preflight OPTIONS

    this.app.set("trust proxy", 1);

    // Cookies httpOnly
    this.app.use(cookieParser());

    // Parseo de body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Archivos estáticos
    this.app.use(express.static("public"));
    this.app.use("/docs", express.static("docs"));
  }

  routes() {
    // Rutas de negocio
    this.app.use(this.paths.suscripcion, SuscripcionRoutes);
    this.app.use(this.paths.exportar, ExportarRoutes);

    // Rutas de autenticación (login, logout, me)
    this.app.use(this.paths.auth, authRouter);

    // Rutas de correos (👈 ahora pasamos multer.fields aquí)
    this.app.use(
      this.paths.correos,
      this.upload.fields([
        { name: "file", maxCount: 1 },
        { name: "image", maxCount: 1 },
      ]),
      correosRouter
    );
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

export default Server;
