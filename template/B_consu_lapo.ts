export const ModeloBienvenida_Consulapo = () => {
  return `
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Consultora Lapo</title>
  <style type="text/css">
    :root {
      --primary-color: #2a2a2a;
      --highlight-color: #f26202;
      --background-color: #ffffff;
    }

    body {
      font-family: 'Arial', sans-serif;
      background-color: var(--background-color);
      color: var(--primary-color);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      max-width: 800px;
      background-color: var(--background-color);
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      border-bottom: 2px solid #ddd;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }

    .header img {
      height: 120px;
      margin-bottom: 10px;
    }

    .header p {
      font-size: 20px;
      font-weight: bold;
      color: var(--highlight-color);
      margin: 0;
    }

    .welcome-message {
      margin: 30px 60px;
      font-size: 18px;
      text-align: justify;
    }

    .welcome-message span.bold-highlight {
      font-weight: bold;
      color: var(--highlight-color);
    }

    .social-section {
      background-color: var(--highlight-color);
      padding: 20px;
      text-align: center;
      color: #fff;
      border-radius: 8px;
    }

    .social-section strong {
      display: block;
      margin-bottom: 10px;
    }

    .social-icons {
      background-color: #ffffffec;
      padding: 10px;
      border-radius: 8px;
      display: inline-block;
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
      .welcome-message {
        margin: 20px;
        font-size: 16px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <!-- Encabezado -->
    <div class="header">
      <img src="https://consultoralapo.com/assets/images/logo.jpg" alt="Logo Consultora Lapo">
      <p>BIENVENIDO A CONSULTORA LAPO</p>
    </div>

    <!-- Mensaje de Bienvenida -->
    <div class="welcome-message">
      <p>
        🎓 <span class="bold-highlight">¡Gracias por unirte a la comunidad de Consultora Lapo Ecuador!</span><br><br>
        Somos un centro de capacitación profesional comprometido con brindar formación de calidad, herramientas prácticas y orientación estratégica para el desarrollo personal y empresarial. 💡
        <br><br>
        En Consultora Lapo creemos en el poder del conocimiento y la educación continua como motores de transformación.
        Nos enorgullece apoyarte en tu camino hacia el crecimiento, con programas especializados, instructores de excelencia y una experiencia de aprendizaje integral. 🚀<br><br>
        <span class="bold-highlight">¡Estamos emocionados de que formes parte de nuestra comunidad educativa!</span>
      </p>
    </div>

    <!-- Información de Contacto -->
    <div class="social-section">
      <strong>Contacto: 0968714558</strong>
      <strong>Correo: consultoralapo@gmail.com</strong>
      <strong>Dirección: Ecuador</strong>
      <strong>¡Síguenos en nuestras redes sociales!</strong>
      <div class="social-icons">
        <a href="https://www.facebook.com/consultoralapo/" target="_blank">
          <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/facebook-logo-colored-bordered.png"
            alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/consultoralapo/?hl=es-la" target="_blank">
          <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/instagram-logo-colored-bordered.png"
            alt="Instagram" />
        </a>
        <a href="https://walink.co/b71508" target="_blank">
          <img src="https://zgtorq.stripocdn.email/content/assets/img/messenger-icons/logo-colored-bordered/whatsapp-logo-colored-bordered.png"
            alt="WhatsApp" />
        </a>
        <a href="https://ec.linkedin.com/company/consultoralapo?trk=ppro_cprof" target="_blank">
          <img src="https://zgtorq.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/linkedin-logo-colored-bordered.png"
            alt="LinkedIn" />
        </a>
      </div>
    </div>
  </div>
</body>

</html>

`;
};
