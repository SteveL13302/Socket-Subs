export const EnvioCorreo_Agepro = (
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
    <title>AgePro</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">

    <div style="width: 100%; max-width: 800px; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

        <!-- Header -->
        <div style="display: flex; justify-content: center; align-items: center; border-bottom: 2px solid #dddddd; padding-bottom: 20px; margin-bottom: 20px;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: #333333;">
                <img src="https://agepro.com.ec/assets/img/logo/logo.jpg" alt="Logo" height="150" style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;">
                <p style="margin: 0; font-size: 16px; color: #00afe4; font-weight: 700;">${emailTitle}</p>
            </div>
        </div>

        <!-- Mensaje -->
        <div style="margin-bottom: 20px; text-align: justify;">
            <p style="font-size: 18px; font-weight: 400; color: #333333; margin: 30px 60px;">
                ${emailMessage}
                <br><br>

                <!-- Condicional para mostrar el botón -->
                ${
                    enableButton
                    ? `
                    <a href="${buttonLink}" style="padding: 10px 20px; background-color: #00afe4; color: #ffffff; text-decoration: none; display: block; width: fit-content; margin: 0 auto; border-radius: 5px; font-weight: bold; text-align: center; margin-bottom: -20px;">
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
        <div style="background-color: #00afe4; padding: 20px; text-align: center; color: #ffffff; font-size: 18px; line-height: 1.5;">
            <p style="margin: 0; color: #ffffff; font-weight: bold;">
                CONTACTO: 0968714558 <br>
                Correo: agepro.asesores@gmail.com <br>
                Dirección: A108 Calle Adam, Quito, Ecuador <br>
                ¡SÍGUENOS!
            </p>

            <div style="margin-top: 10px; background-color: #ffffffec; padding: 5px; border-radius: 8px; text-align: center;">
                <!-- Facebook -->
                <a href="https://www.facebook.com/agepro.asesores?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/facebook-logo-colored-bordered.png" alt="Facebook" style="width: 32px; vertical-align: middle;">
                </a>
                <!-- Instagram -->
                <a href="https://www.instagram.com/agepro.asesores?igsh=NWlzemliYTl6MWFy" target="_blank" rel="noopener noreferrer" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/instagram-logo-colored-bordered.png" alt="Instagram" style="width: 32px; vertical-align: middle;">
                </a>
                <!-- WhatsApp -->
                <a href="https://api.whatsapp.com/send?phone=593968714558" target="_blank" rel="noopener noreferrer" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/messenger-icons/logo-colored-bordered/whatsapp-logo-colored-bordered.png" alt="WhatsApp" style="width: 32px; vertical-align: middle;">
                </a>
            </div>
        </div>
    </div>

</body>
</html>`;
};
