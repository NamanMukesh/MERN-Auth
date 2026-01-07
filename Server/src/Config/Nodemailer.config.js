import nodemailer from "nodemailer";
import brevoTransport from "nodemailer-brevo-transport";

const transporter = nodemailer.createTransport(
  brevoTransport({
    apiKey: process.env.BREVO_API_KEY
  })
);

export default transporter;
