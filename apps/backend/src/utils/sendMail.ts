import nodemailer from "nodemailer";
import EnvSecret from "src/constants/envVariables";

const transporter = nodemailer.createTransport({
  host: EnvSecret.MAIL_HOST,
  port: EnvSecret.MAIL_PORT,
  secure: EnvSecret.MAIL_PORT === 465, // true for 465, false for 2525/587
  auth: {
    user: EnvSecret.MAIL_USER,
    pass: EnvSecret.MAIL_PASS,
  },
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
      from: EnvSecret.MAIL_USER,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendNewsletterNotification = async (
  email: string,
  name: string | null,
  subject: string,
  html: string,
) => {
  try {
    if (!email) {
      throw new Error("Subscriber email not found");
    }

    const mailOptions = {
      from: EnvSecret.MAIL_USER,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Newsletter notification sent to ${email}${name ? ` (${name})` : ''}`);
  } catch (error) {
    console.error("Error sending newsletter notification:", error);
  }
};

const sendBulkNewsletterNotification = async (
  subscribers: Array<{ email: string; name: string | null }>,
  subject: string,
  html: string,
) => {
  try {
    const promises = subscribers.map((subscriber) =>
      sendNewsletterNotification(subscriber.email, subscriber.name, subject, html)
    );
    
    await Promise.all(promises);
    console.log(`Newsletter notifications sent to ${subscribers.length} subscribers`);
  } catch (error) {
    console.error("Error sending bulk newsletter notifications:", error);
  }
};

export { sendOrderConfirmationEmail, sendNewsletterNotification, sendBulkNewsletterNotification };
