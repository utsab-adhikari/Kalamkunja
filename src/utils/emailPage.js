// /utils/emailPage.js
export const htmlVerify = (token) => {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png" alt="Kalamkunja" style="height: 60px;"/>
          <h1 style="color: #2c3e50;">Verify Your Email</h1>
        </div>
        <p style="color: #34495e; font-size: 16px;">
          Hello! Thanks for joining <strong>Kalamkunja</strong>. To activate your account, please verify your email by clicking the button below:
        </p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${process.env.baseUrl}/v1/auth/verification/${token}" 
            style="background-color: #007BFF; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-size: 16px;">
            Verify Email
          </a>
        </div>
        <p style="color: #7f8c8d; font-size: 14px;">This link will expire in <strong>30 minutes</strong>.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="text-align: center; font-size: 13px; color: #aaa;">
          &copy; ${new Date().getFullYear()} Kalamkunja. All rights reserved.
        </p>
      </div>
    </div>
  `;
};

export const htmlWelcome = (name) => {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png" alt="Kalamkunja" style="height: 60px;"/>
          <h1 style="color: #2c3e50;">Welcome to Kalamkunja 🎉</h1>
        </div>
        <p style="color: #34495e; font-size: 16px;">
          Hi ${name || "there"}, <br/><br/>
          Thank you for signing up to <strong>Kalamkunja</strong>!  
          We’re excited to have you join our growing community of readers, writers, and learners. 
        </p>
        <p style="color: #34495e; font-size: 16px; margin-top: 20px;">
          With your account, you’ll be able to:  
          <ul style="margin: 15px 0; padding-left: 20px; color: #34495e; font-size: 15px;">
            <li>Read and explore thoughtful articles</li>
            <li>Share your own stories and insights</li>
            <li>Connect with like-minded people</li>
          </ul>
        </p>
        <p style="color: #34495e; font-size: 16px;">
          Get started by setting up your profile.  
          We can’t wait to see what you’ll bring to the Kalamkunja family 💙
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="text-align: center; font-size: 13px; color: #aaa;">
          &copy; ${new Date().getFullYear()} Kalamkunja. All rights reserved.
        </p>
      </div>
    </div>
  `;
};
