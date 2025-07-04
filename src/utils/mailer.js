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

export async function sendLocationEmail({ to, address, latitude, longitude, ipAddress, mapLink, name }) {
  // Debug logging
  console.log('sendLocationEmail called with:', { to, address, latitude, longitude, ipAddress, mapLink, name });
  
  const transporter = createTransporter();

  const mailOptions = {
    from: `PinSafe <${process.env.GMAIL_SENDER_ADDRESS}>`,
    to,
    subject: `${name || 'Someone'} just shared their location with you`,
    html: `
      <h2>Location Shared Successfully</h2>
      <ul style="list-style:none;padding:0;">
        <li><strong>Name:</strong> ${name || 'N/A'}</li>
        <li><strong>Email:</strong> ${to}</li>
        <li><strong>Address:</strong> ${address}</li>
        <li><strong>Latitude:</strong> ${latitude}</li>
        <li><strong>Longitude:</strong> ${longitude}</li>
        <li><strong>IP Address:</strong> ${ipAddress}</li>
        <li><a href="${mapLink}" target="_blank">View on Google Maps</a></li>
      </ul>
      <hr style="margin:24px 0;" />
      <div style="font-size:0.9em;color:#888;">
        Powered by <strong>PinSafe</strong>.<br/>
        PinSafe lets you instantly and securely share your location with anyone—no account needed. <br/>
        Learn more at <a href="https://pinsafe.netlify.app/" target="_blank">https://pinsafe.netlify.app/</a>
      </div>
    `,
  };

  // Debug logging
  console.log('Mail options:', mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
} 