import { Request, Response } from "express";
import Usuario from "../models/usuarios";

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