import dotenv from "dotenv";
dotenv.config();

import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY, SENDGRID_TEMPLATE_ID } = process.env;

export const sendGridMail = async (data) => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  try {
    const msg = {
      from: "cnopsniels@gmail.com",
      template_id: SENDGRID_TEMPLATE_ID,
      personalizations: [
        {
          to: [{ email: "jorne@jsjj.be" }],
          dynamic_template_data: {
            ...data,
            date: new Date().toLocaleDateString("nl-BE"),
          },
        },
      ],
    };
    JSON.stringify(msg.personalizations);
    await sgMail.send(msg);
    console.log("message sent");
  } catch (error) {
    console.error(error);
  }
};
