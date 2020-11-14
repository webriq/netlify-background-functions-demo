const { jsPDF } = require("jspdf");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER || "44314661af65a2928",
    pass: process.env.MAILTRAP_PASSWORD || "093bfd51adeb42",
  },
});

exports.handler = async function (event) {
  const { content, destination } = JSON.parse(event.body);
  console.log(`Sending PDF report to ${destination}`);

  const report = Buffer.from(
    new jsPDF().text(content, 10, 10).output("arraybuffer")
  );
  const info = await transporter.sendMail({
    from: "Uncaught Exception <hello@uncaughtexception.com>",
    to: destination,
    subject: "New Report From Uncaught Exception!",
    text: "See attached messsaged in PDF",
    attachments: [
      {
        filename: `ue-report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: "application/pdf",
      },
    ],
  });

  console.log(`PDF report sent: ${info.messageId}`);
};
