// controllers/exportar.ts
import { Request, Response } from "express";
import Contacto from "../models/contacto";
import ExcelJS from "exceljs";

export const exportarContactosExcel = async (req: Request, res: Response) => {
  try {
    const contactos = await Contacto.findAll();

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
      { header: "Página", key: "pagina", width: 20 },
    ];

    contactos.forEach((c: any) => worksheet.addRow(c.toJSON()));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=contactos.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error al exportar contactos a Excel:", error);
    res.status(500).json({ success: false, message: "Error al exportar" });
  }
};
