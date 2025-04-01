const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
const sendResetEmail = async (email, resetToken) => {
  try {
    const resetLink = `https://yourfrontend.com/reset-password?token=${resetToken}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset Your Password",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f7fa;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 2px solid #eee;
              }
              .header h1 {
                color: #333;
              }
              .content {
                padding: 20px;
                color: #555;
                font-size: 16px;
              }
              .cta-button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #4CAF50;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                font-weight: bold;
              }
              .cta-button:hover {
                background-color: #45a049;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                font-size: 14px;
                color: #aaa;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                <p>Hi there,</p>
                <p>We received a request to reset your password. To reset your password, please click the button below:</p>
                <a href="${resetLink}" class="cta-button">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
              </div>
              <div class="footer">
                <p>If you have any questions, feel free to reach out to our support team.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendResetEmail;
