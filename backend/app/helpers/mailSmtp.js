const nodemailer = require("nodemailer");
const {
  HTTP_SERVER_DOMAIN,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;
const transporter = nodemailer.createTransport({
  port: SMTP_PORT,
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  secure: false,
});
async function sendEmailRegistration(name, email, verificationCode) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation?verification_code=${verificationCode}`;
  const mailData = {
    from: SMTP_FROM,
    to: email,
    subject: "Bienvenido a DPMO",
    text: `Hola ${name}, para confirmar la activacion de tu cuenta click aquí: ${linkActivation}`,
    html: `Hola ${name}, para confirmar <a href="${linkActivation}">activa aqui</a>`,
  };
  console.log("mailData", mailData);
  const data = await transporter.sendMail(mailData);
  console.log(data);
  return data;
}
async function sendEmailCorrectValidation(name, email) {
  const mailData = {
    from: SMTP_FROM,
    to: email,
    subject: "[DPMO] Cuenta activada!",
    text: `Hola ${name},\n tu cuenta ha sido activada. Disfruta de DPMO`,
    html: `<p>Hola ${name},</p><p>tu cuenta ha sido activada. Disfruta de DPMO</p>`,
  };
  const data = await transporter.sendMail(mailData);
  console.log(data);
  return data;
}
module.exports = {
  sendEmailRegistration,
  sendEmailCorrectValidation,
};
