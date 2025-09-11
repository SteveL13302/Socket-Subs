"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const { HOST_MAIL, PORT_MAIL, USER_MAIL, PASSWORD_MAIL } = process.env;
const transporter = nodemailer_1.default.createTransport({
    host: HOST_MAIL,
    port: Number(PORT_MAIL),
    secure: true,
    auth: {
        user: USER_MAIL,
        pass: PASSWORD_MAIL // Contraseña desde el archivo .env
    }
});
// Función para enviar el correo
const sendEmail = (to, subject, htmlContent, attachments) => {
    const mailOptions = {
        from: USER_MAIL,
        to: to,
        subject: subject,
        html: htmlContent,
        attachments: attachments ? [{ path: attachments }] : [] // Adjuntamos el archivo si se pasa
        // attachdments: attachments  // Archivos adjuntos, si hay
    };
    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        }
        else {
            console.log('Correo enviado:', info.response);
        }
    });
};
exports.sendEmail = sendEmail;
