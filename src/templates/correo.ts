export const EnvioCorreo = (
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
    <title>Camara Mipymes</title>
    <style type="text/css">
        /* Aquí van los estilos CSS */
    </style>
</head>

<body
    style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <div
        style="width: 100%; max-width: 800px; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div
            style="display: flex; justify-content: center; align-items: center; border-bottom: 2px solid #ddd; padding-bottom: 20px; margin-bottom: 20px;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: #333;">
                <img class="adapt-img"
                    src="https://mipymesec.com/Suscripcion/assets/image/logo.png"
                    alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                    height="150">
                <p style="margin: 0; font-size: 16px; color: #0b5394;">${emailTitle}</p>
            </div>
        </div>

        <!-- Mensaje -->
        <div style="margin-bottom: 20px; text-align: justify;">
            <p style="font-size: 18px; font-weight: 400; color: #333; margin: 30px 60px;">${emailMessage} <br><br>
                <!-- Condicional para mostrar el botón -->
                ${
                  enableButton
                    ? `
                <a href="${buttonLink}"
                style="padding: 10px 20px; background-color: #71c9059d; color: white; text-decoration: none; display: block; width: fit-content; margin: 0 auto; border-radius: 5px; font-weight: bold; text-align: center;margin-bottom: -20px;">
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
                <img src="${imageUrl}" alt="Imagen incluida" style="max-width: 100%; height: auto;">
            </div>`
                : ""
            }
        </div>

        <!-- Redes Sociales -->
        <div style="background-color: #032f6e ; padding: 20px; text-align: center;">
            <!-- <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">¡TE INVITAMOS A SEGUIRNOS EN TODAS NUESTRAS
                REDES SOCIALES!</p> -->
            <p style="color: #ffffff; font-size: 18px; line-height: 1.5;">
                <em style="color: #ffffff;">Begroup, somos innovación y tecnología.</em><br><br><strong
                    style="color: #ffffff;">CONTACTO: 0982792618 - 0986591764 - 0994813097<br>¡SÍGUENOS!</strong><br>
            </p>
            <div
                style="text-align: center; margin-top: 10px;background-color: #ffffffec;padding: 5px; border-radius: 8px;">
                <!-- Facebook -->
                <a href="https://www.facebook.com/people/Be-Group/100064120628159/"
                    style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/facebook-logo-colored-bordered.png"
                        width="32" alt="Facebook">
                </a>
                <!-- Youtube -->
                <a href="https://www.youtube.com/@BeGroupSAS" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/youtube-logo-colored-bordered.png"
                        width="32" alt="YouTube">
                </a>
                <!-- Linkedin -->
                <a href="https://www.linkedin.com/feed/update/urn:li:activity:6991794310417391616?updateEntityUrn=urn%3Ali%3Afs_feedUpdate%3A%28V2%2Curn%3Ali%3Aactivity%3A6991794310417391616%29"
                    style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/linkedin-logo-colored-bordered.png"
                        width="32" alt="LinkedIn">
                </a>
                <!-- Tiktok -->
                <a href="https://www.tiktok.com/@begroupecu?is_from_webapp=1&sender_device=pc"
                    style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/tiktok-logo-colored-bordered.png"
                        width="32" alt="TikTok">
                </a>
                <!-- WhatsApp -->
                <a href="https://api.whatsapp.com/send?phone=593986069719"
                    style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/messenger-icons/logo-colored-bordered/whatsapp-logo-colored-bordered.png"
                        width="32" alt="WhatsApp">
                </a>
                <!-- instagram  -->
                <a href="https://www.instagram.com/begroupec/" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/instagram-logo-colored-bordered.png"
                        width="32" alt="Instagram">
                </a>
                <!-- Web  -->
                <a href="http://www.begroupec.com/" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://zgtorq.stripocdn.email/content/assets/img/other-icons/logo-colored-bordered/link-logo-colored-bordered.png"
                        width="32" alt="Website">
                </a>
            </div>
        </div>
    </div>
</body>

</html>`;
};
