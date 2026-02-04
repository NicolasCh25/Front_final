import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,            // ⚠️ CAMBIO: Usamos 587 en lugar de 465
    secure: false,        // ⚠️ CAMBIO: false para puerto 587
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    },
    tls: {
        rejectUnauthorized: false // Ignorar certificados auto-firmados si los hubiera
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
        throw error; 
    }
};

export default sendMail;