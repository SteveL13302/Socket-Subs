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
exports.suscribirseConProductos = void 0;
const contacto_1 = __importDefault(require("../models/contacto"));
const enviar_correo_1 = require("../services/enviar_correo");
const B_agepro_1 = require("../template/B_agepro");
const B_consu_lapo_1 = require("../template/B_consu_lapo"); // Asegúrate de tener este archivo
const suscribirseConProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Body recibido:", req.body);
        let { nombre_apellido, telefono, correo, ciudad, term_condi, form_id, cedula, direccion, pagina } = req.body;
        form_id = Number(form_id);
        const activo = true; // Asignamos como true para actualización o creación
        let contacto = null;
        if (cedula) {
            contacto = yield contacto_1.default.findOne({ where: { cedula } });
        }
        if (!contacto && telefono) {
            contacto = yield contacto_1.default.findOne({ where: { telefono } });
        }
        if (contacto) {
            yield contacto.update({
                nombre_apellido,
                correo,
                ciudad: ciudad || null,
                direccion: direccion || null,
                cedula: cedula || null,
                pagina: pagina || null,
                term_condi,
                activo // ← se añade aquí también
            });
            console.log("Contacto actualizado:", contacto);
        }
        else {
            contacto = yield contacto_1.default.create({
                nombre_apellido,
                telefono,
                correo,
                ciudad: ciudad || null,
                direccion: direccion || null,
                cedula: cedula || null,
                pagina: pagina || null,
                activo,
                term_condi
            });
            console.log("Nuevo contacto creado:", contacto);
        }
        // Selección dinámica de plantilla y redirección
        let htmlContent = "";
        let redirectUrl = "";
        if (pagina === "agepro") {
            htmlContent = (0, B_agepro_1.ModeloBienvenida_Agepro)();
            redirectUrl = "/Suscripcion/Bienvenida_Agepro.html";
        }
        else if (pagina === "consu_lapo") {
            htmlContent = (0, B_consu_lapo_1.ModeloBienvenida_Consulapo)();
            redirectUrl = "/Suscripcion/Bienvenida_Lapo.html";
        }
        else {
            htmlContent = (0, B_agepro_1.ModeloBienvenida_Agepro)(); // valor por defecto
            redirectUrl = "/Suscripcion/Bienvenida_Agepro.html";
        }
        // Enviar el correo
        setTimeout(() => {
            (0, enviar_correo_1.sendEmail)(correo, "Confirmación de suscripción", htmlContent, null);
            console.log("Correo de confirmación enviado.");
        }, 15000);
        return res.status(200).json({
            success: true,
            message: "Suscripción registrada exitosamente.",
            redirect: redirectUrl
        });
    }
    catch (error) {
        console.error("Error al procesar la suscripción:", error);
        return res.status(500).send("Hubo un error al procesar la suscripción.");
    }
});
exports.suscribirseConProductos = suscribirseConProductos;
