
import dotenv from 'dotenv';

import nodemailer from 'nodemailer';

dotenv.config(); 

const { HOST_MAIL, PORT_MAIL, USER_MAIL, PASSWORD_MAIL } = process.env;

const transporter = nodemailer.createTransport({
  host: HOST_MAIL,  // Host del servidor SMTP
  port: Number(PORT_MAIL),  // Puerto del servidor SMTP
  secure: true,      // Usamos true para conexión segura (SSL/TLS)
  auth: {
    user: USER_MAIL,  // Correo electrónico desde el archivo .env
    pass: PASSWORD_MAIL  // Contraseña desde el archivo .env
  }
} as nodemailer.TransportOptions);

// Función para enviar el correo
export const sendEmail = (to:string, subject:string, htmlContent:string, attachments: any) => {
  const mailOptions = {
    from: USER_MAIL,  // Correo de origen (usamos la variable de entorno)
    to: to,  // Correo del destinatario
    subject: subject,  // Asunto del correo
    html: htmlContent,  // El cuerpo del correo es el contenido HTML
    attachments: attachments ? [{ path: attachments }] : []  // Adjuntamos el archivo si se pasa
    // attachments: attachments  // Archivos adjuntos, si hay
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error:any, info:any) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}
