import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // host: EnvSecret.MAIL_HOST,
  // port: EnvSecret.MAIL_PORT,
  // secure: EnvSecret.MAIL_PORT === 465, // true for 465, false for 2525/587
  // auth: {
  //   user: EnvSecret.MAIL_USER,
  //   pass: EnvSecret.MAIL_PASS,
  // },
});

const sendOrderConfirmationEmail = async (
  email: string,
  subject: string,
  html: string,
) => {
  try {
    if (!email) {
      throw new Error("User email not found");
    }

    const mailOptions = {
      from: "",
      to: email,
      subject,
      // text: `Thank you for your order!`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendOrderConfirmationEmail };
