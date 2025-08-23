import { Request, Response } from "express";
import Contacto from "../models/contacto";
import { sendEmail } from "../services/enviar_correo";
import { ModeloBienvenida_Agepro } from "../template/B_agepro";
import { ModeloBienvenida_Consulapo } from "../template/B_consu_lapo"; // Asegúrate de tener este archivo

export const suscribirseConProductos = async (req: Request, res: Response) => {
  try {
    console.log("Body recibido:", req.body);

    let {
      nombre_apellido,
      telefono,
      correo,
      ciudad,
      term_condi,
      form_id,
      cedula,
      direccion,
      pagina
    } = req.body;

    form_id = Number(form_id);
    const activo = true; // Asignamos como true para actualización o creación

    let contacto = null;

    if (cedula) {
      contacto = await Contacto.findOne({ where: { cedula } });
    }

    if (!contacto && telefono) {
      contacto = await Contacto.findOne({ where: { telefono } });
    }

    if (contacto) {
      await contacto.update({
        nombre_apellido,
        correo,
        ciudad: ciudad || null,
        direccion: direccion || null,
        cedula: cedula || null,
        pagina: pagina || null,
        term_condi,
        activo // ← se añade aquí también
      });
      console.log("Contacto actualizado:", contacto);
    } else {
      contacto = await Contacto.create({
        nombre_apellido,
        telefono,
        correo,
        ciudad: ciudad || null,
        direccion: direccion || null,
        cedula: cedula || null,
        pagina: pagina || null,
        activo,
        term_condi
      });
      console.log("Nuevo contacto creado:", contacto);
    }

    // Selección dinámica de plantilla y redirección
    let htmlContent = "";
    let redirectUrl = "";

    if (pagina === "agepro") {
      htmlContent = ModeloBienvenida_Agepro();
      redirectUrl = "/Suscripcion/Bienvenida_Agepro.html";
    } else if (pagina === "consu_lapo") {
      htmlContent = ModeloBienvenida_Consulapo();
      redirectUrl = "/Suscripcion/Bienvenida_Consulapo.html";
    } else {
      htmlContent = ModeloBienvenida_Agepro(); // valor por defecto
      redirectUrl = "/Suscripcion/Bienvenida_Agepro.html";
    }

    // Enviar el correo
    setTimeout(() => {
      sendEmail(correo, "Confirmación de suscripción", htmlContent, null);
      console.log("Correo de confirmación enviado.");
    }, 15000);

    return res.status(200).json({
      success: true,
      message: "Suscripción registrada exitosamente.",
      redirect: redirectUrl
    });

  } catch (error) {
    console.error("Error al procesar la suscripción:", error);
    return res.status(500).send("Hubo un error al procesar la suscripción.");
  }
};
