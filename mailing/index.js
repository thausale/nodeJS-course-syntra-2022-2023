import express from "express";
// import { sendEmail } from "./mail/nodemailer.js";

import { sendGridMail } from "./mail/sendgrid.js";
const app = express();
const PORT = 3000;
//APP LISTEN HAS TO BE AT THE BOTTOM, ADD MIDDLEWARE HERE
// app.use(pageRoutes); //IF USING cnExpressRouter
//ADD cnExpressListen to the bottom of the page to launch server
app.use(express.json());

app.post("/tjaka", async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    const data = { name, email, message, subject };
    await sendGridMail(data);

    console.log({ name, email, message, subject });
    res.status(200).json({
      status: "succes",
      message: "mail successfully sent!",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

(async () => {
  try {
    //await connect();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
