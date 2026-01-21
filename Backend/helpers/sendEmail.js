import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap"

const sendEmail = async({
    to,
    subject,
    text,
    html,
    category
})=> {
    try{

        if(process.env.EMAIL_ENABLED !== "true"){
            console.log('Servicio de email no disponible');
            return;
        }

        if(process.env.EMAIL_PROVIDER === "mailtrap"){
            const transport = Nodemailer.createTransport(
                MailtrapTransport({
                    token: process.env.MAILTRAP_API_KEY,
                    sandbox: true,
                    testInboxId: process.env.MAILTRAP_INBOX_ID
                })
            );

            const sender = {
                address: process.env.EMAIL_FROM_ADDRESS,
                name: process.env.EMAIL_FROM_NAME
            };

            const info = await transport.sendMail({
                from: sender,
                to,
                subject,
                text,
                html,
                category: category || 'App email'
            })

            console.log('Email enviado correctamente', info.messageId)
            return info;
        }
        throw new Error('Proveedor de email no soportado');
    }catch(error){
        console.log('Email no enviado', error.message || error);
        throw new Error('Fallo al enviar el mensaje');
    }
}

export default sendEmail; 