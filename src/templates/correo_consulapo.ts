export const EnvioCorreo_Lapo = (
  emailTitle: string,
  emailMessage: string,
  buttonText: string,
  buttonLink: string,
  enableButton: boolean,
  enableImage: boolean,
  imageUrl: string
): string => {
  return `<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultora Lapo</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #2a2a2a; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">

  <div style="width: 100%; max-width: 800px; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <!-- Header -->
    <div style="text-align: center; border-bottom: 2px solid #dddddd; padding-bottom: 20px; margin-bottom: 20px;">
      <img src="https://consultoralapo.com/assets/images/logo.jpg" alt="Logo" height="120" style="display: block; border: 0; outline: none; text-decoration: none; margin: 0 auto; margin-bottom: 10px;">
      <p style="font-size: 20px; font-weight: bold; color: #f26202; margin: 0;">${emailTitle}</p>
    </div>

    <!-- Mensaje -->
    <div style="margin-bottom: 20px; text-align: justify;">
      <p style="font-size: 18px; font-weight: 400; color: #2a2a2a; margin: 30px 60px;">
        ${emailMessage} <br><br>

        <!-- Condicional para mostrar el botón -->
        ${
          enableButton
          ? `
          <a href="${buttonLink}" style="padding: 10px 20px; background-color: #f26202; color: #ffffff; text-decoration: none; display: block; width: fit-content; margin: 0 auto; border-radius: 5px; font-weight: bold; text-align: center; margin-bottom: -20px;">
            <span style="display: inline-block; margin-right: 8px;">📍</span> ${buttonText}
          </a>
          `
          : ""
        }
      </p>

      <!-- Mostrar la imagen si 'enableImage' es verdadero -->
      ${
        enableImage && imageUrl
        ? `
        <div style="text-align: center; margin-top: 20px;">
          <img src="${imageUrl}" alt="Imagen incluida" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
        </div>
        `
        : ""
      }
    </div>

    <!-- Redes Sociales -->
    <div style="background-color: #f26202; padding: 20px; text-align: center; color: #ffffff; border-radius: 8px;">
      <strong style="display: block; margin-bottom: 10px;">Contacto: 0968714558</strong>
      <strong style="display: block; margin-bottom: 10px;">Correo: consultoralapo@gmail.com</strong>
      <strong style="display: block; margin-bottom: 10px;">Dirección: Ecuador</strong>
      <strong style="display: block; margin-bottom: 10px;">¡Síguenos en nuestras redes sociales!</strong>

      <div style="background-color: #ffffffec; padding: 10px; border-radius: 8px; display: inline-block;">
        <!-- Facebook -->
        <a href="https://www.facebook.com/consultoralapo/" target="_blank" style="margin: 0 10px; text-decoration: none;">
          <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/facebook-logo-colored-bordered.png" alt="Facebook" style="width: 32px; vertical-align: middle;">
        </a>
        <!-- Instagram -->
        <a href="https://www.instagram.com/consultoralapo/?hl=es-la" target="_blank" style="margin: 0 10px; text-decoration: none;">
          <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/instagram-logo-colored-bordered.png" alt="Instagram" style="width: 32px; vertical-align: middle;">
        </a>
        <!-- WhatsApp -->
        <a href="https://walink.co/b71508" target="_blank" style="margin: 0 10px; text-decoration: none;">
          <img src="https://zgtorq.stripocdn.email/content/assets/img/messenger-icons/logo-colored-bordered/whatsapp-logo-colored-bordered.png" alt="WhatsApp" style="width: 32px; vertical-align: middle;">
        </a>
        <!-- LinkedIn -->
        <a href="https://ec.linkedin.com/company/consultoralapo?trk=ppro_cprof" target="_blank" style="margin: 0 10px; text-decoration: none;">
          <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/linkedin-logo-colored-bordered.png" alt="LinkedIn" style="width: 32px; vertical-align: middle;">
        </a>
      </div>
    </div>
  </div>

</body>
</html>
`;
};
