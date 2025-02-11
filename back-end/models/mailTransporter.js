import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service provider like Yahoo, Outlook, etc.
    auth: {
      user: 'the80sgirl23@gmail.com',  // Your email address
      pass: 'ekfl jihc rxcq lunu', // Your email password or app-specific password
    },
  });
const validateEmail = (email) =>{
    const re = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
export default transporter;
export {validateEmail};