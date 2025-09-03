import { Request, Response } from 'express';
import Contacto from '../models/contacto';

const SUPERUSER = (process.env.SUPERUSER ?? 'socket_studio').toLowerCase();
const isSuperuser = (u?: string) => !!u && u.toLowerCase() === SUPERUSER;

export const obtenerContactos = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).auth?.usuario as string | undefined;

    // Superusuario ve todo; el resto se filtra por 'pagina = usuario'
    const where: any = isSuperuser(usuario) ? {} : { pagina: usuario };

    const contactos = await Contacto.findAll({
      where,
      order: [['id', 'ASC']],
    });

    return res.status(200).json({
      success: true,
      contactos: contactos.map(c => ({
        id: c.id,
        cedula: c.cedula,
        nombre_apellido: c.nombre_apellido,
        telefono: c.telefono,
        correo: c.correo,
        ciudad: c.ciudad,
        direccion: c.direccion,
        activo: c.activo,
        term_condi: c.term_condi,
        pagina: c.pagina,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    return res.status(500).json({
      success: false,
      message: 'Hubo un error al obtener los contactos.',
    });
  }
};
