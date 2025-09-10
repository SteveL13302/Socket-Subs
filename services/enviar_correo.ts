import nodemailer from 'nodemailer';

// Función para enviar correo con credenciales dinámicas
export const sendEmail = async (
  smtpConfig: {
    user_mail: string;
    host_mail: string;
    port_mail: number;
    password_mail: string;
  },
  to: string,
  subject: string,
  htmlContent: string,
  attachments?: string
) => {
  // Crear un transporter por cada envío (dinámico según el usuario)
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host_mail,
    port: smtpConfig.port_mail,
    secure: true,
    auth: {
      user: smtpConfig.user_mail,
      pass: smtpConfig.password_mail,
    },
  } as nodemailer.TransportOptions);

  const mailOptions = {
    from: smtpConfig.user_mail, // El correo del usuario que envía
    to,
    subject,
    html: htmlContent,
    attachments: attachments ? [{ path: attachments }] : [],
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        reject(error);
      } else {
        console.log('Correo enviado:', info.response);
        resolve(info);
      }
    });
  });
};
