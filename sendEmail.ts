import nodemailer from "nodemailer";

export const sendEmail: () => void = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "martin.mdp92@gmail.com",
      pass: "cbjjxdbkhvrjoatc",
    },
  });

  const mailOptions = {
    from: "martin.mdp92@gmail.com",
    to: "martinrdilorenzo@gmail.com",
    subject: "HAY PASAJES ",
    text: "HAY PASAJES DE TREN. ENTRA A LA WEB DE TRENES ARGENTINOS",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
