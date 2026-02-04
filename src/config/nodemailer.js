import nodemailer from 'nodemailer';

// Creación del Transporter para Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail', // ✅ Esto configura host y puertos automáticamente para Gmail
    auth: {
        user: process.env.USER_MAILTRAP, // Tu correo de Gmail
        pass: process.env.PASS_MAILTRAP  // Tu contraseña de aplicación de 16 letras
    }
});

// Función genérica para enviar correos
const sendMail = async (userMail, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.USER_MAILTRAP,
            to: userMail,
            subject: subject,
            html: html
        });
        console.log("Mensaje enviado: %s", info.messageId);
        return info;
    } catch (error) {
        console.log("Error al enviar correo: ", error);
        throw error; // Lanzamos el error para que el controlador sepa que falló
    }
};

export default sendMail;