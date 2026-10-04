const nodemailer = require('nodemailer');

// Gmail SMTP transporter using an App Password (recommended) or any SMTP provider.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

async function sendEnquiryEmail(enquiry) {
  const {
    fullName, email, phone, adults, children, infants, message, package: pkg, createdAt,
  } = enquiry;

  const html = `
    <div style="font-family:Arial,sans-serif; max-width:600px; margin:auto;">
      <h2 style="color:#0B4F6C;">New Enquiry - Andaman Dream Yatra</h2>
      <table cellpadding="8" style="border-collapse:collapse; width:100%;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
        <tr><td><strong>Package</strong></td><td>${escapeHtml(pkg || 'General enquiry')}</td></tr>
        <tr><td><strong>Adults</strong></td><td>${adults}</td></tr>
        <tr><td><strong>Children (5-12)</strong></td><td>${children}</td></tr>
        <tr><td><strong>Infants (0-5)</strong></td><td>${infants}</td></tr>
        <tr><td><strong>Message</strong></td><td>${escapeHtml(message || '-')}</td></tr>
        <tr><td><strong>Submitted</strong></td><td>${createdAt}</td></tr>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: `"Andaman Dream Yatra Website" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO || 'andamandreamyatra@gmail.com',
    replyTo: email,
    subject: `New Enquiry from ${fullName} - Andaman Dream Yatra`,
    html,
  });
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports = { sendEnquiryEmail };
