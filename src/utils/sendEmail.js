import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Verify Team" <Kalamkunja>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent: %s", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email sending failed");
  }
}

export async function sendEmailWelcome(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Kalamkunja" <Team>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent: %s", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email sending failed");
  }
}