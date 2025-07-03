import nodemailer from 'nodemailer';

function createTransporter() {
  // Configure the transporter for Gmail with OAuth2
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_SENDER_ADDRESS,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });
}

export async function sendLocationEmail({ to, address, latitude, longitude, ipAddress, mapLink }) {
  const transporter = createTransporter();

  const mailOptions = {
    from: `PinSafe <${process.env.GMAIL_SENDER_ADDRESS}>`,
    to,
    subject: 'Your Location Has Been Shared',
    html: `
      <h2>Location Shared Successfully</h2>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Latitude:</strong> ${latitude}</p>
      <p><strong>Longitude:</strong> ${longitude}</p>
      <p><strong>IP Address:</strong> ${ipAddress}</p>
      <p><a href="${mapLink}" target="_blank">View on Google Maps</a></p>
      <p>This link will expire soon for your privacy.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
} 