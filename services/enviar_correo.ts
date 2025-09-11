import nodemailer from "nodemailer";

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
): Promise<any> => {
  // Crear un transporter dinámico según el usuario logueado
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host_mail,
    port: smtpConfig.port_mail,
    secure: true,
    auth: {
      user: smtpConfig.user_mail,
      pass: smtpConfig.password_mail,
    },
  });

  const mailOptions = {
    from: smtpConfig.user_mail, // remitente
    to,
    subject,
    html: htmlContent,
    attachments: attachments ? [{ path: attachments }] : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
    return info;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error; // 👈 importante: si falla, el controlador lo captura
  }
};
