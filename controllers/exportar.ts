import { Request, Response } from "express";
import Contacto from "../models/contacto";
import ExcelJS from "exceljs";

const SUPERUSER = (process.env.SUPERUSER ?? "socket_studio").toLowerCase();
const isSuperuser = (u?: string) => !!u && u.toLowerCase() === SUPERUSER;

export const exportarContactosExcel = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).auth?.usuario as string | undefined;
    const where: any = isSuperuser(usuario) ? {} : { pagina: usuario };

    const contactos = await Contacto.findAll({
      where,
      order: [["id", "ASC"]],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Contactos");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Cédula", key: "cedula", width: 20 },
      { header: "Nombre y Apellido", key: "nombre_apellido", width: 30 },
      { header: "Teléfono", key: "telefono", width: 20 },
      { header: "Correo", key: "correo", width: 30 },
      { header: "Ciudad", key: "ciudad", width: 20 },
      { header: "Dirección", key: "direccion", width: 25 },
      { header: "Activo", key: "activo", width: 10 },
      { header: "Fecha Registro", key: "createdAt", width: 10 },
      { header: "Página", key: "pagina", width: 20 },
    ];
    worksheet.getRow(1).font = { bold: true };
    worksheet.autoFilter = { from: "A1", to: "I1" };

    contactos.forEach((c) =>
      worksheet.addRow({
        id: c.id,
        cedula: c.cedula,
        nombre_apellido: c.nombre_apellido,
        telefono: c.telefono,
        correo: c.correo,
        ciudad: c.ciudad,
        direccion: c.direccion,
        activo: c.activo ? "Sí" : "No",
        createdAt: c.createdAt
          ? new Date(c.createdAt).toISOString().split("T")[0]
          : "",
        pagina: c.pagina,
      })
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=contactos.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error al exportar contactos a Excel:", error);
    res.status(500).json({ success: false, message: "Error al exportar" });
  }
};
