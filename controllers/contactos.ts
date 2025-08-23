import { Request, Response } from 'express';
import Contacto from '../models/contacto';

export const obtenerContactos = async (req: Request, res: Response) => {
    try {
        console.log("Solicitud para obtener contactos recibida");

        // Obtener todos los contactos desde la base de datos
        const contactos = await Contacto.findAll();

        if (!contactos || contactos.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "No se encontraron contactos." 
            });
        }

        // Responder con los contactos obtenidos
        res.status(200).json({
            success: true,
            contactos: contactos.map(contacto => ({
                id: contacto.id,
                cedula: contacto.cedula,
                nombre_apellido: contacto.nombre_apellido,
                telefono: contacto.telefono,
                correo: contacto.correo,
                ciudad: contacto.ciudad,
                direccion: contacto.direccion,
                activo: contacto.activo,
                term_condi: contacto.term_condi,
                pagina: contacto.pagina,
                createdAt: contacto.createdAt,
                updatedAt: contacto.updatedAt
            })),
        });
    } catch (error) {
        console.error("Error al obtener contactos:", error);
        res.status(500).json({
            success: false,
            message: "Hubo un error al obtener los contactos.",
        });
    }
};
