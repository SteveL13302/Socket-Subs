export const ModeloBienvenida_Agepro = () => {
  return `
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AgePro</title>
  <style type="text/css">
    :root {
      --nav-color: #222222;
      --nav-hover-color: #106eea;
      --nav-mobile-background-color: #ffffff;
      --nav-dropdown-background-color: #ffffff;
      --nav-dropdown-color: #222222;
      --nav-dropdown-hover-color: #106eea;
    }

    #outlook a {
      padding: 0;
    }

    .es-button {
      mso-style-priority: 100 !important;
      text-decoration: none !important;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    .es-desk-hidden {
      display: none;
      float: left;
      overflow: hidden;
      width: 0;
      max-height: 0;
      line-height: 0;
      mso-hide: all;
    }

    [data-ogsb] .es-button {
      border-width: 0 !important;
      padding: 10px 20px 10px 20px !important;
    }

    body {
      font-family: 'Arial', sans-serif;
      background-color: var(--nav-mobile-background-color);
      color: var(--nav-color);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      width: 100%;
      max-width: 800px;
      background-color: var(--nav-mobile-background-color);
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
.header {
  display: flex;
  flex-direction: column; /* Cambiado para apilar verticalmente */
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: var(--nav-color);
}

    .header p {
      margin: 0;
      font-size: 16px;
      color: var(--nav-hover-color);
      font-weight: 700;
    }

    .welcome-message {
      margin-bottom: 20px;
      text-align: center;
      margin: 30px 60px;
      color: var(--nav-color);
      font-size: 18px;
      font-weight: 400;
      text-align: justify;
    }

    .welcome-message span.bold-highlight {
      font-weight: bold;
      color: var(--nav-hover-color);
    }

    /* Redes Sociales */
    .social-section {
      background-color: #00afe4;
      padding: 20px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      line-height: 1.5;
    }

    .social-section strong {
      color: #fff;
    }

    .social-icons {
      margin-top: 10px;
      background-color: #ffffffec;
      padding: 5px;
      border-radius: 8px;
      text-align: center;
    }

    .social-icons a {
      margin: 0 10px;
      text-decoration: none;
    }

    .social-icons img {
      width: 32px;
      vertical-align: middle;
    }

    @media only screen and (max-width: 600px) {
      * {
        line-height: 150% !important;
      }

      h1,
      h2,
      h3 {
        text-align: left !important;
        font-size: 24px !important;
      }

      .es-header-body p,
      .es-content-body p,
      .es-footer-body p {
        font-size: 14px !important;
      }

      .es-button {
        width: 100% !important;
      }
      
      .welcome-message {
        margin: 20px 20px !important;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <img class="adapt-img"
        src="https://agepro.com.ec/assets/img/logo/logo.jpg"
        alt="Logo AGEPRO" height="120" style="display:block; border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic;"/>
      <br><br><p>BIENVENIDO A AGEPRO</p>
    </div>

    <!-- Mensaje de bienvenida a AGEPRO -->
    <div class="welcome-message">
      <p>
        🌟 <span class="bold-highlight">¡Nos complace darte la bienvenida a la comunidad de AGEPRO!</span>
        Desde 2005, hemos trabajado con compromiso y seriedad para brindar soluciones de consultoría, auditoría y asesoría
        que marcan la diferencia en el crecimiento de nuestros clientes. En AGEPRO, valoramos la confianza, el respeto y la atención personalizada,
        y nos esforzamos por ofrecer servicios innovadores y de alta calidad que impulsen el éxito mutuo. 🚀<br /><br />
        Estamos entusiasmados de contar contigo en este camino hacia la mejora continua y grandes logros compartidos.
        ¡Juntos seguiremos construyendo un futuro sólido y próspero! 💪🎉
      </p>
    </div>

    <!-- Redes Sociales -->
    <div class="social-section">
      <p>
        <strong>
          CONTACTO: 0968714558 <br />
          Correo: agepro.asesores@gmail.com <br />
          Dirección: A108 Calle Adam, Quito, Ecuador <br />
          ¡SÍGUENOS!
        </strong>
      </p>
      <div class="social-icons">
        <!-- Facebook -->
        <a href="https://www.facebook.com/agepro.asesores?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
          <img
            src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/facebook-logo-colored-bordered.png"
            alt="Facebook" />
        </a>
        <!-- Instagram -->
        <a href="https://www.instagram.com/agepro.asesores?igsh=NWlzemliYTl6MWFy" target="_blank" rel="noopener noreferrer">
          <img
            src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/instagram-logo-colored-bordered.png"
            alt="Instagram" />
        </a>
        <!-- WhatsApp -->
        <a href="https://api.whatsapp.com/send?phone=593968714558" target="_blank" rel="noopener noreferrer">
          <img
            src="https://zgtorq.stripocdn.email/content/assets/img/messenger-icons/logo-colored-bordered/whatsapp-logo-colored-bordered.png"
            alt="WhatsApp" />
        </a>
      </div>
    </div>
  </div>
</body>

</html>
`;
};
