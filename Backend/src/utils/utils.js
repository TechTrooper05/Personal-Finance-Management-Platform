function generateOTP() {
    return Math.floor(100000 + Math.random()*900000).toString();
}

function getOtpHtml(otp) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>FinTrack OTP Verification</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f7fa;">
        <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

            <div style="background:#2563eb; padding:25px; text-align:center; color:white;">
                <h1 style="margin:0;">FinTrack</h1>
                <p style="margin-top:8px;">Your Personal Finance Companion</p>
            </div>

            <div style="padding:40px 30px; text-align:center;">
                <h2 style="color:#333;">Verify Your Email</h2>

                <p style="color:#555; font-size:16px; line-height:1.6;">
                    Use the following One-Time Password (OTP) to complete your verification process.
                </p>

                <div style="
                    display:inline-block;
                    margin:25px 0;
                    padding:15px 35px;
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:8px;
                    color:#2563eb;
                    background:#f1f5f9;
                    border-radius:10px;
                    border:2px dashed #2563eb;
                ">
                    ${otp}
                </div>
                <p style="color:#555; font-size:14px; line-height:1.6;">This email will expire in 10 minutes</p>
                <p style="color:#666; font-size:14px;">
                    If you did not request this code, you can safely ignore this email.
                </p>
            </div>

            <div style="
                background:#f8fafc;
                padding:20px;
                text-align:center;
                color:#888;
                font-size:12px;
            ">
                © ${new Date().getFullYear()} FinTrack. All rights reserved.
            </div>

        </div>
    </body>
    </html>
    `;
}

module.exports = { generateOTP, getOtpHtml };