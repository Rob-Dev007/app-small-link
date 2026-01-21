import sendEmail from './sendEmail.js';

const olvidePasswordEmail = async (datos)=>{

  const { nombres, apellidos, correo, token } = datos;

  const subject = 'Correo para recuperar cuenata';

  const html = `
        <p>Hola ${nombres} ${apellidos}, este es el sistema small-link App </p>
        <p>Has solicitado recuperación de la contraseña, ingresa al siguiente enlace para generar una nueva contraseña <a href="${process.env.URL_FRONTEND}/olvide-password/${token}">Recuperar contraseña</a></p>
        
        <p>Si tu no solicitaste restablecer tu contraseña , te sugerimos ignorar este mensaje</p>
        `
  const text = `
        Hola ${nombres} ${apellidos}, este es el sistema de small-link App.
        Has solicitado recuperación de la contraseña, ingresa al siguiente enlace para generar una nueva contraseña
        ${process.env.URL_FRONTEND}/olvide-password/${token}.
        
        Si tu no solicitaste restablecer tu contraseña , te sugerimos ignorar este mensaje
        `

    await sendEmail({
      to: correo,
      subject: subject,
      html,
      text,
      category: 'password'
    })
};

export default olvidePasswordEmail;