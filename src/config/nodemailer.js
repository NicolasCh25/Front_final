import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true para puerto 465, false para otros puertos
    auth: {
        user: process.env.USER_MAILTRAP, // Tu correo Gmail
        pass: process.env.PASS_MAILTRAP  // Tu contraseña de aplicación (16 caracteres)
    },
    tls: {
        rejectUnauthorized: false // Ayuda a evitar errores de certificados en servidores compartidos
    }
});

const sendMail = async (userMail, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.USER_MAILTRAP,
            to: userMail,
            subject: subject,
            html: html
        });
        console.log("✅ Correo enviado con éxito. ID:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Error enviando email:", error);
        throw error; // Lanzar el error para que el controlador sepa que falló
    }
};

export default sendMail;