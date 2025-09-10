import { Request, Response } from "express";
import Contacto from "../models/contacto";
import Usuario from "../models/usuarios";
import EnviosCorreos from "../models/enviar_correos";

import { EnvioCorreo } from "../src/templates/correo";
import { sendEmail } from "../services/enviar_correo";

const SUPERUSER = (process.env.SUPERUSER ?? "socket_studio").toLowerCase();
const isSuperuser = (u?: string) => !!u && u.toLowerCase() === SUPERUSER;

// Obtener configuración SMTP del usuario logueado
export const obtenerConfigSMTP = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).auth?.usuario as string | undefined;
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. Usuario no autenticado.",
      });
    }

    // Si es superuser puede obtener cualquier configuración (en este caso solo retornamos la suya)
    const where: any = isSuperuser(usuario) ? {} : { usuario };

    const config = await Usuario.findOne({ where });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: "No se encontró configuración SMTP para este usuario.",
      });
    }

    return res.status(200).json({
      success: true,
      smtp: {
        user_mail: config.user_mail,
        host_mail: config.host_mail,
        port_mail: config.port_mail,
        nombre_empresa: config.nombre_empresa,
      },
    });
  } catch (error) {
    console.error("Error al obtener configuración SMTP:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener la configuración SMTP.",
    });
  }
};

export const actualizarConfigSMTP = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).auth?.usuario as string | undefined;
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. Usuario no autenticado.",
      });
    }

    const { user_mail, host_mail, port_mail, nombre_empresa } = req.body;

    const [updated] = await Usuario.update(
      { user_mail, host_mail, port_mail, nombre_empresa },
      { where: { usuario } }
    );

    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontró configuración para actualizar.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Configuración SMTP actualizada correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar configuración SMTP:", error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la configuración SMTP.",
    });
  }
};

export const enviarCorreo = async (req: Request, res: Response) => {
  try {
    const {
      emailSubject,
      sendTime,
      emailTitle,
      emailMessage,
      enableButton,
      buttonText,
      buttonLink,
      enableFile,
      enableImage,
    } = req.body;

    // 🟢 Log para debug
    console.log("BODY recibido en enviarCorreo:", req.body);
    console.log("Campos parseados:", {
      emailSubject,
      sendTime,
      emailTitle,
      emailMessage,
      enableButton,
      buttonText,
      buttonLink,
      enableFile,
      enableImage,
    });

    const files = req.files as
      | { [key: string]: Express.Multer.File[] }
      | undefined;
    const file = files && "file" in files ? files["file"][0] : null;
    const image = files && "image" in files ? files["image"][0] : null;

    // 🟢 Cargar credenciales SMTP del usuario logueado
    const usuario = (req as any).auth?.usuario;
    const configSMTP = await Usuario.findOne({ where: { usuario } });

    if (!configSMTP) {
      return res.status(400).json({
        success: false,
        message: "No se encontró configuración SMTP para este usuario",
      });
    }

    // ⚡ Cast explícito para evitar errores de TypeScript
    const smtpConfig = {
      user_mail: configSMTP.user_mail as string,
      host_mail: configSMTP.host_mail as string,
      port_mail: Number(configSMTP.port_mail),
      password_mail: configSMTP.password_mail as string,
    };

    const htmlContent = EnvioCorreo(
      emailTitle,
      emailMessage,
      buttonText,
      buttonLink,
      enableButton === "true" || enableButton === true,
      enableImage === "true" || enableImage === true,
      image ? `/uploads/${image.filename}` : ""
    );

    const contactos = await Contacto.findAll({ where: { activo: true } });

    // Guardar registro en base
    const nuevoEnvio = await EnviosCorreos.create({
      asunto: emailSubject,
      fecha_envio: sendTime,
      titulo_mensaje: emailTitle,
      mensaje: emailMessage,
      habilitar_boton: enableButton === "true" || enableButton === true,
      texto_boton: buttonText || null,
      enlace_boton: buttonLink || null,
      habilitar_archivo: enableFile === "true" || enableFile === true,
      ruta_archivo: file ? file.path : null,
      archivo_nombre: file?.originalname || null,
      habilitar_imagen: enableImage === "true" || enableImage === true,
      ruta_imagen: image ? image.path : null,
      imagen_nombre: image?.originalname || null,
    });

    for (const contacto of contactos) {
      if (!contacto.correo) {
        console.warn(`Contacto sin correo, ID: ${contacto.id}`);
        continue;
      }

      await sendEmail(smtpConfig, contacto.correo, emailSubject, htmlContent);
    }

    return res.status(200).json({
      success: true,
      message: "Correos enviados correctamente",
      envio: nuevoEnvio,
    });
  } catch (error) {
    console.error("Error al enviar correos:", error);
    return res.status(500).json({
      success: false,
      message: "Error al enviar correos",
    });
  }
};
