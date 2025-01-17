import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import fs from "fs";

const root_template_dir = __dirname + "/../configs/mail_templates/";

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL_USER,
    pass: process.env.ADMIN_EMAIL_PASS,
  },
});

const generateRestaurantCreatedTemplate = async (
  ownerEmail: string,
  ownerName: string,
  subject: string,
  text: string,
): Promise<any> => {
  const htmlTemplate = fs.readFileSync(
    root_template_dir + "createRestaurant.html",
    "utf8"
  );
  const htmlString = htmlTemplate.replace("{{restaurantOwner}}", ownerName);

  const mailOptions: SendMailOptions = {
    from: process.env.ADMIN_EMAIL_USER,
    to: ownerEmail,
    subject,
    text,
    html: htmlString,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default generateRestaurantCreatedTemplate;
