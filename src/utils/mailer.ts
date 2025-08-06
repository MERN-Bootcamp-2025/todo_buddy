import nodemailer from 'nodemailer';

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string; 
}


export async function sendMail({ to, subject, html, text }: MailOptions): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"TODO BUDDY" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(` Email sent to ${to}`);
  } catch (error) {
    console.error(` Failed to send email to ${to}:`, error);
    throw error;
  }
}




export const sendUserMail = async (from: string, to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_HOST,
        secure: Number(process.env.SMTP_PORT) === 465, 
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };
     try {
    const responseMail=await transporter.sendMail(mailOptions);
    console.log(` Email sent to ${to}`,responseMail);
  } catch (error) {
    console.error(` Failed to send email to ${to}:`, error);
    throw error;
  }

}