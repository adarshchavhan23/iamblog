const nodemailer = require('nodemailer');

exports.sendToken = async (res, code, message, user) => {
    const token = await user.getJWTToken();

    return res.cookie('authToken', token, {
        maxAge: 90 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true,
        // sameSite: "none"
    }).send({
        success: true,
        code,
        message,
        user,
    });
}

exports.sendEmail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS
    },
    secure: true,
    port: 465
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject,
    html
  };

  return await transporter.sendMail(mailOptions);
}