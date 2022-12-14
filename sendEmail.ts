import nodemailer from "nodemailer";

export const sendEmail: () => void = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "martin.mdp92@gmail.com",
      pass: "KEY_PASS",
    },
  });

  const mailOptions = {
    from: "martin.mdp92@gmail.com",
    to: ["martinrdilorenzo@gmail.com"],
    subject: "HAY PASAJES DE TREN",
    text: "HAY PASAJES DE TREN. ENTRA A LA WEB DE TRENES ARGENTINOS: https://www.argentina.gob.ar/transporte/trenes-argentinos/pasajes-larga-distancia",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
