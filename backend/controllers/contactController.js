const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendContactEmail =  async (req, res) => {
    //passing payload from the frontend into new varriables
    consolelog('payload:',req.body);
    const {name, email, subject, message } =req.body;
        //validate the payload
    if (!name || !email || !subject ||!message) {
        return res.status(400).json({ error: 'All fields are required'});
    }

    try {

        const transporter = nodemailer.createTransport({
            host:process.env. SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure: false,
            auth:  {
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_PASS,
            }

            
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.TO_EMAIL,
            subject: subject,
            html: `
                <h3>New Contact Message</h3>
                <p><b><Name:/b>${name}</p>
                <p><b><Email:/b>${email}</p>
                <p><b><Subject:/b>${subject}</p>
                <p>${message}</p> 
            `         
        });
        //200 status means ok
        console.log({ message: 'Message sent successfully!'});
        res.status(200).json({ messsage: 'Message sent successfully!'});
    } catch (e) {
        console.error('Email error:', e);
        res.status(500).json({ error: 'something went wrong. Try again later.'});

    }

}