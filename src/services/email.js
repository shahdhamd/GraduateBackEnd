import nodemailer from "nodemailer";
export async function sendEmail(dest,subject,message){
    let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.UserEmail,
        pass: process.env.passwardApp
    }
    });

   
    let info = await transporter.sendMail({
        from:`Plant App <${process.env.UserEmail}$>`, // sender address
        to: dest, // list of receivers
        subject: subject, // Subject line
        html: message, // html body
    })

    return info
}
