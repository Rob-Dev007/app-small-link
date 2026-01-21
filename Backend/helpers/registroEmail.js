import sendEmail from './sendEmail.js';

//Configuración de registro con Brevo Apikey (producción)
/**const registroEmail = async ({ nombres, apellidos, correo, token }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "small-link", email: "robdev0695@gmail.com" },
        from: "small-link <robdev0695@gmail.com>",
        to: [{ email: correo, name: `${nombres} ${apellidos}` }],
        subject: "Comprueba tu cuenta en small link app",
        htmlContent: `
          <p>Hola ${nombres} ${apellidos}, este es el sistema de small link app</p>
          <p>
            Para registrar tu cuenta, ingresa al siguiente enlace:
            <a href="${process.env.URL_FRONTEND}/confirmar/${token}">
              Registrar cuenta
            </a>
          </p>
          <p>Si no te registraste, ignora este mensaje.</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📧 Correo enviado vía Brevo API ✅");
  } catch (error) {
    console.error(
      "❌ Error enviando correo:",
      error.response?.data || error.message
    );
  }
};**/

const registroEmail = async ({ nombres, apellidos, correo, token }) => {

  const subject = "Comprueba tu cuenta en small link app";

  const html = `
          <p>Hola ${nombres} ${apellidos}, este es el sistema de <b>small link app</b></p>
          <p>
            Para registrar tu cuenta, ingresa al siguiente enlace:
            <a href="${process.env.URL_FRONTEND}/confirmar/${token}">
              Registrar cuenta
            </a>
          </p>
          <p>Si no te registraste, ignora este mensaje.</p>
          `

  const text = `
          Hola ${nombres} ${apellidos}

          Para registrar tu cuenta en small-link App, visita el siguiente enlace:

          ${process.env.URL_FRONTEND}/confirmar/${token}}

          Si tu no te registraste, ignora este mensaje.
  `
  
  await sendEmail({
    to: correo,
    subject,
    html,
    text, 
    category: "Registro"
  })   
};

export default registroEmail;