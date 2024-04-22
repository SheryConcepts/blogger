import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chsheharyarahmed@gmail.com",
    pass: process.env.MAIL_SERVER_PASSWORD,
  },
});
