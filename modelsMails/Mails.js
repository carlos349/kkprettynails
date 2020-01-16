const nodemailer = require("nodemailer");


class Email{

    constructor(KConfig){
        this.createTransport = nodemailer.createTransport(KConfig)   
    }

    sendMail(KEmail){
        try{
            this.createTransport.sendMail(KEmail, (error, info) => {
                if(error){
                    console.log('Error al enviar el email')
                }else{
                    console.log('Correo enviado correctamente')
                }
                this.createTransport.close()
            })
        }catch(err){
            console.log('error: '+ err)
        }
    }
}

module.exports = Email

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
// //   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//         user: 'carlos.gomes349@gmail.com', // generated ethereal user
//         pass: '25430435carlos16' // generated ethereal password
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <carlos.gomes349@gmail.com>', // sender address
//     to: "loles29@hotmail.com", // list of receivers
//     subject: "Hello World ✔", // Subject line
//     text: "Hope", // plain text body
//     html: "<b>Nope hello?</b>" // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }



