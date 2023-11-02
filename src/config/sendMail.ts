
import nodemailer from 'nodemailer';
import { SendMessageTemplate } from '../templateEmail/sendMessage'
export async function SendMail(mail: string, title: string, message: string ) {
    
    const SMTP_CONFIG = require('../config/smtp')
    
    const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass    
    },    
    tls: {
        rejectUnauthorized: false
    }
    });
    const templateEmail = SendMessageTemplate(message)
    const mailOptions = {
        from: SMTP_CONFIG.user,
        to: mail,
        subject: title,
        html: templateEmail, 
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`E-mail enviado para ${mail}`)
    } catch (error) {
        console.log(error)
    }
    
}
