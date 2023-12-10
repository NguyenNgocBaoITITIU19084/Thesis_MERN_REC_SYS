const nodemailer = require("nodemailer");

const message = require("../config/Messages");

class EmailService {
  static init() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: 587,
      secure: process.env.SMPT_SERVICE, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });
    console.log(`${message.email_config.success}`);
  }
  static async sendGmail(from, to, subject, text, html) {
    await this.transporter.sendMail({ from, to, subject, text, html });
  }
}

module.exports = EmailService;
