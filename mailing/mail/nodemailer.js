import dotenv from "dotenv";
dotenv.config();
// import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

export const sendEmail = async (data) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_USER, // generated ethereal user
        pass: SMTP_PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: data.email, // sender address
      to: ["cnops_niels@hotmail.com"], // list of receivers
      subject: "Hello ✔", // Subject line
      html: `<h1> Hallo ${data.name} </h1>
    <p>${data.message}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(error);
  }
};
