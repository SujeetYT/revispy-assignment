import transporter from "@/lib/transporter";

interface Data {
  to: string;
  otp: string;
}


/**
 * This function is used to send email to the candidates who are shortlisted for the interview
 * @param to - Array of email addresses whom we want to send the email
 * @param otp - OTP to be sent to the user
 * @returns - Returns the result of the email sent
*/
async function sendEmailOtp({to, otp}: Data):Promise<any> {
  try {
    const mailOptions = {
      from: `"Sujeet Kumar" <${process.env.NODE_MAILER_USERNAME}>`,
      to: to,
      subject: 'OTP Verification',
      html: `
      <html>
        <body>
          <p>Hi,</p>
          <p>Thank you for signing up with us. Please use the following OTP to verify your email address</p>
          <p><strong>${otp}</strong> is your OTP. This OTP expires in 30 minutes.</p>
          <p>Please do not share it with anyone.</p>
          <br/>
          <p>Regards,</p>
          <p>Sujeet Kumar</p>
        </body>
      </html>
      `,
    };
  
    const result = await transporter.sendMail(mailOptions);
    // console.log(":: debugger point ::", result);
  
  } catch (error) {
    console.log(":: sendEmail error ::", error);
    
  }
}

export default sendEmailOtp;