//npm install smtp-server nodemailer

// smtp-server setup
const { SMTPServer } = require('smtp-server');
const nodemailer = require('nodemailer');

// Constants
const LOCAL_SMTP_PORT = 2525;
const EMAIL_FROM = 'sender@example.com';

// Set up the SMTP server
const server = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
        let emailData = '';
        stream.on('data', (chunk) => {
            emailData += chunk;
        });
        stream.on('end', () => {
            console.log('Email received:', emailData);
            callback(null);
        });
    }
});

server.listen(LOCAL_SMTP_PORT, () => {
    console.log(`SMTP server listening on port ${LOCAL_SMTP_PORT}`);
});

// Set up the nodemailer transporter to use the local SMTP server
const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: LOCAL_SMTP_PORT,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: EMAIL_FROM,
        to,
        subject,
        text
    };
    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };

// Example usage
//sendEmail('recipient@example.com', 'Test Subject', 'Test email body')
//    .then(info => console.log('Email sent:', info))
//    .catch(err => console.error('Error sending email:', err));
