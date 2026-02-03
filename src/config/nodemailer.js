// --- Enviar correo de confirmación de registro ---
const sendMailToRegister = (userMail, token) => {

    return sendMail(
        userMail,
        "Bienvenido a SMARTVET",
        `
            <h1>Confirma tu cuenta</h1>
            <p>Hola, haz clic en el siguiente enlace para confirmar tu cuenta:</p>

            <a href="${process.env.URL_FRONTEND}confirmar/${token}">
                Confirmar cuenta
            </a>

            <hr>
            <footer>El equipo de SMARTVET te da la más cordial bienvenida.</footer>
        `
    )
}



// --- Enviar correo para recuperar contraseña ---
const sendMailToRecoveryPassword = (userMail, token) => {

    return sendMail(
        userMail,
        "Recupera tu contraseña",
        `
            <h1>SMARTVET - 🐶 😺</h1>
            <p>Has solicitado restablecer tu contraseña.</p>

            <a href="${process.env.URL_FRONTEND}reset/${token}">
                Clic para restablecer tu contraseña
            </a>

            <hr>
            <footer>El equipo de SMARTVET te da la más cordial bienvenida.</footer>
        `
    )
}

module.exports = {
    sendMailToRegister,
    sendMailToRecoveryPassword
}
