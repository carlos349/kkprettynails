const express = require('express');
const clients = express.Router()
const cors = require('cors');
const Cliente = require('../models/Cliente')
const Citas = require('../models/Citas')
const email = require('../modelsMails/Mails')
const multer = require('multer')
const { diskStorage } = require('multer')
const path = require('path')
const Venta = require('../models/Venta')
const kmailCredentials = require('../private/kmail-credentials')
const smailCredentials = require('../private/smail-credentials')
const imgMails = require('../private/endpointsLogo.js')
const storage = diskStorage({
	destination: 'public/mailsImage',
	filename: (req, files, cb) => {
		cb(null, Date.now() + path.extname(files.originalname));
	}
})
const upload = multer({
	storage:storage
})
const KMails = new email(kmailCredentials)
const SMails = new email(smailCredentials)
clients.use(cors())

clients.post('/sendEmailsSyswa', async (req, res, next) => {
    var array = {}
    let mail = {}
    if (req.body.typeMail == 1) {
        array = {
            to: req.body.to
        }
        mail = {
            from: "SYSWA WEB",
            to: array.to,
            subject: 'Informacion a cliente',
            html: `
            <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                <div style="width: 100%;height: 10vh;margin: auto;background-color: #181d81;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                    <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                        <img style="width: 100%;" src="http://syswa.net/views/images/syswa-isotipo.png" alt="Logo kkprettynails">
                    </div>
                </div>
                <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;paddin-left:2px;">
                    <center>
                        <div style="width:100%;text-align: center;">
                            <h1 style="text-align: center;color:#181d81;">Bienvenido(a) </h1>
                            <hr style="border-top: 1.5px solid #f0f1f3;">
                            <p style="text-align:center;margin-top:10px;font-size:18px;"> <strong>Hola</p>
                            <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 90%;margin:auto;">
                                <strong> 
                                    Nos alegra que te hayas suscrito en nuestro sitio web, por este medio te enviaremos todas las novedades de nuestros servicios.
                                </strong>
                            </p>
                        <div>
                    </center>
                </div>
                <div style="width: 100%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;padding:10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom:10px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                    <center>
                        <div style="width:100%;">
                            <center>
                                <p style="text-align:center;font-size:14px;"> Contacto</p>
                                <a  href="mailto:syswainfo@gmail.com" style="margin-left:20px;text-decoration:none;"> 
                                    <img style="width:7%;" src="${imgMails}mails.png" alt="Logo mail">
                                </a>
                                <a  href="https://www.instagram.com/syswanet/" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:7%;" src="${imgMails}igs.png" alt="Logo ig">
                                </a>
                                <a  href="https://api.whatsapp.com/send?phone=56985826974&text=&source=&data=&app_absent=" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:7%;" src="${imgMails}wss.png" alt="Logo ws">
                                </a>
                                <a  href="https://syswa.net" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:7%;" src="${imgMails}webs.png" alt="Logo web">
                                </a>
                                <br>
                                <p style="text-align:center;font-size:14px;"> Atendemos las 24 horas, los 7 días de la semana</p>
                            </center>
                        </div>
                    </center>
                </div>
            </div>
            `
        }
        mailTwo = {
            from: "SYSWA WEB",
            to: 'syswainfo@gmail.com',
            subject: 'Nueva suscripción de cliente',
            html: `
            <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                <div style="width: 100%;height: 10vh;margin: auto;background-color: #181d81;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                    <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                        <img style="width: 100%;" src="http://syswa.net/views/images/syswa-isotipo.png" alt="Logo kkprettynails">
                    </div>
                </div>
                <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;">
                    <center>
                        <div style="width:90%;text-align: center;">
                            <h1 style="text-align: center;color:#181d81;">Actualización de clientes</h1>
                            <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 80%;margin:auto;">
                            <strong> Se ha suscrito un nuevo cliente con el correo ${array.to}</strong>
                            </p>
                        <div>
                    </center>
                </div>
            </div>
            `
        }
    }
    if (req.body.typeMail == 2) {
        array = {
            to: req.body.to,
            subject: "Contratar servicio",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            number: req.body.number,
            type: req.body.type
        }
        mail = {
            from: "SYSWA WEB",
            to: array.to,
            subject: array.subject,
            html: `
            <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                <div style="width: 100%;height: 10vh;margin: auto;background-color: #181d81;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                    <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                        <img style="width: 100%;" src="http://syswa.net/views/images/syswa-isotipo.png" alt="Logo kkprettynails">
                    </div>
                </div>
                <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;padding-left:2px;">
                    <center>
                        <div style="width:100%;text-align: center;">
                            <h1 style="text-align: center;color:#181d81;">Bienvenido(a) </h1>
                            <hr style="border-top: 1.5px solid #f0f1f3;">
                            <p style="text-align:center;margin-top:10px;font-size:18px;"> <strong>Hola ${array.firstName} ${array.lastName}</p>
                            <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 80%;margin:auto;"><strong> 
                                    Nos alegra que te hayas interesado en nuestros servicios, pronto nuestro equipo se pondrá en contacto contigo ofreciéndote la información que necesites.
                                </strong>
                            </p>
                        <div>
                    </center>
                </div>
                <div style="width: 100%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom:10px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                    <center>
                        <div style="width:100%;">
                            <center>
                                <p style="text-align:center;font-size:14px;"> Contacto</p>
                                <a  href="mailto:syswainfo@gmail.com" style="margin-left:20px;text-decoration:none;"> 
                                    <img style="width:7%;" src="${imgMails}mails.png" alt="Logo mail">
                                </a>
                                <a  href="https://www.instagram.com/syswanet/" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:7%;" src="${imgMails}igs.png" alt="Logo ig">
                                </a>
                                <a  href="https://api.whatsapp.com/send?phone=56985826974&text=&source=&data=&app_absent=" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:7%;" src="${imgMails}wss.png" alt="Logo ws">
                                </a>
                                <a  href="https://syswa.net" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:7%;" src="${imgMails}webs.png" alt="Logo web">
                                </a>
                                <br>
                                <p style="text-align:center;font-size:14px;"> Atendemos las 24 horas, los 7 días de la semana</p>
                            </center>
                        </div>
                    </center>
                </div>
            </div>
            `
        }
        mailTwo = {
            from: "SYSWA WEB",
            to: 'syswainfo@gmail.com',
            subject: 'Nueva solicitud de servicio',
            html: `
            <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                <div style="width: 100%;height: 10vh;margin: auto;background-color: #181d81;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                    <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                        <img style="width: 100%;" src="http://syswa.net/views/images/syswa-isotipo.png" alt="Logo kkprettynails">
                    </div>
                </div>
                <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;padding-left:2px;">
                    <center>
                        <div style="width:100%;text-align: center;">
                            <h1 style="text-align: center;color:#181d81;">El cliente contrató un servicio</h1>
                            <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 80%;margin:auto;">
                            <strong>El cliente ${array.firstName} ${array.lastName} ha contratado el servicio ${array.type}, por favor ponerse en contacto.</strong><br>Correo: ${array.to} <br> Teléfono: ${array.number}
                            </p>
                        <div>
                    </center>
                </div>
            </div>
            `
        }
    }
    if (req.body.typeMail == 3) {
        array = {
            to: req.body.to,
            subject: req.body.subject,
            Name: req.body.Name,
            message: req.body.message
        }
        mail = {
            from: "SYSWA WEB",
            to: array.to,
            subject: array.subject,
            html: `
            <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                <div style="width: 100%;height: 10vh;margin: auto;background-color: #181d81;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                    <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                        <img style="width: 100%;" src="http://syswa.net/views/images/syswa-isotipo.png" alt="Logo kkprettynails">
                    </div>
                </div>
                <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;padding-left:2px;">
                    <center>
                        <div style="width:100%;text-align: center;">
                            <h1 style="text-align: center;color:#181d81;">Bienvenid(a) </h1>
                            <hr style="border-top: 1.5px solid #f0f1f3;">
                            <p style="text-align:center;margin-top:10px;font-size:18px;"> <strong>¡Hola ${array.Name}!</p>
                            <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 80%;margin:auto;">
                                <strong> 
                                    Nos alegra que te hayas interesado en nuestros servicios, pronto nuestro equipo se pondrá en contacto contigo ofreciéndote la información que necesites.
                                </strong>
                            </p>
                        <div>
                    </center>
                </div>
                <div style="width: 100%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom:20px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                    <center>
                        <div style="width:100%;">
                            <center>
                                <p style="text-align:center;font-size:14px;"> Contacto</p>
                                <a  href="mailto:syswainfo@gmail.com" style="margin-left:20px;text-decoration:none;"> 
                                    <img style="width:7%;" src="${imgMails}mails.png" alt="Logo mail">
                                </a>
                                <a  href="https://www.instagram.com/syswanet/" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:7%;" src="${imgMails}igs.png" alt="Logo ig">
                                </a>
                                <a  href="https://api.whatsapp.com/send?phone=56985826974&text=&source=&data=&app_absent=" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:7%;" src="${imgMails}wss.png" alt="Logo ws">
                                </a>
                                <a  href="https://syswa.net" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:7%;" src="${imgMails}webs.png" alt="Logo web">
                                </a>
                                <br>
                                <p style="text-align:center;font-size:14px;"> Atendemos las 24 horas, los 7 días de la semana</p>
                            </center>
                        </div>
                    </center>
                </div>
            </div>
            `
        }
        mailTwo = {
            from: "SYSWA WEB",
            to: 'syswainfo@gmail.com',
            subject: 'Nueva solicitud de contacto',
            html: `
            <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                <div style="width: 100%;height: 10vh;margin: auto;background-color: #181d81;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                    <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                        <img style="width: 100%;" src="http://syswa.net/views/images/syswa-isotipo.png" alt="Logo kkprettynails">
                    </div>
                </div>
                <div style="width:100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;padding-left:2px;">
                    <center>
                        <div style="width:100%;text-align: center;">
                            <h1 style="text-align: center;color:#181d81;">Contacto con cliente</h1>
                            <hr style="border-top: 1.5px solid #f0f1f3;">
                            <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 80%;margin:auto;">
                            <strong>El cliente ${array.Name} necesita información, por favor ponerse en contacto.
                            </strong><br>Correo: ${array.to} <br> Mensaje: ${array.message}
                            </p>
                        <div>
                    </center>
                </div>
            </div>
            `
        }
    }
    
    try{
        const send = await SMails.sendMail(mail)
        try {
            const sendTwo = await SMails.sendMail(mailTwo)
            res.json({status: 'ok'})
        }catch(err) {
            res.send(err)
        }
    }catch(err){
        res.send(err)
    }
})

clients.post('/sendmail', upload.array('image', 3),  async (req, res, next) => {
    var array = {}
    let mail = {}
    if (req.body.type == 1) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            image: req.files[0].filename
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `
            <div>
                <center>
                    <img style="width: 100%; heigth:auto;" src="${imgMails}${array.image}" alt="Imagen de correo">
                </center> 
            </div>
            `
        }
    }
    if (req.body.type == 2) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `
            <div style="width: 50%;margin: auto;background-color: ##f8f9fe;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;">
                    ${array.text}
                    <style>h1{color:#32325d;}h2{color:#32325d;}h3{color:#32325d;}h4{color:#32325d;}h5{color:#32325d;}</style>
            </div>
            `
        }
    }
    if (req.body.type == 3) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            image: req.files[0].filename
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `<div style="width: 50%;margin: auto;background-color: #f8f9fe;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#32325d;">
                    <center>
                       <img style="width: 50%; heigth:auto;" src="${imgMails}${array.image}" alt="Imagen de correo"> 
                    </center>
                    
                ${array.text}
                <style>h1{color:#32325d;}h2{color:#32325d;}h3{color:#32325d;}h4{color:#32325d;}h5{color:#32325d;}</style>
            </div>`
        }
    }
    if (req.body.type == 4) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            textTwo: req.body.textTwo,
            image: req.files[0].filename,
            imageTwo: req.files[1].filename,
            imageThree: req.files[2].filename
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `<div style="width: 50%;margin: auto;background-color: #f8f9fe;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#32325d;">
                    <center>
                       <img style="width: 50%; heigth:auto;" src="${imgMails}${array.image}" alt="Imagen de correo"> 
                    </center>
                    
                ${array.text}

                <center>
                    <div style="display: inline-block;">
                        <img style="width: 50%; heigth:auto;" src="${imgMails}${array.imageTwo}" alt="Imagen de correo2"> 
                        <img style="width: 50%; heigth:auto;" src="${imgMails}${array.imageThree}" alt="Imagen de correo3"> 
                    </div>
                </center>
                ${array.textTwo}
                <style>h1{color:#32325d;}h2{color:#32325d;}h3{color:#32325d;}h4{color:#32325d;}h5{color:#32325d;}</style>
            </div>`
        }
    }
    if (req.body.type == 5) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            image: req.files[0].filename,
        }
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `<div style="width: 50%;margin: auto;background-color: #f8f9fe;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#32325d;">   
                ${array.text}
                <center>
                <img style="width: 50%; heigth:auto;" src="${imgMails}${array.image}" alt="Imagen de correo"> 
                </center>
                <style>h1{color:#32325d;}h2{color:#32325d;}h3{color:#32325d;}h4{color:#32325d;}h5{color:#32325d;}</style>
            </div>`
        }
    }
    console.log(req.body.type)
    if (req.body.type == 6) {
        array = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            textTwo: req.body.textTwo,
            image: req.files[0].filename,
            imageTwo: req.files[1].filename,
            
        }
        
        mail = {
            from: "kkprettynails",
            to: array.to,
            subject: array.subject,
            html: `<div style="width: 50%;margin: auto;background-color: #f8f9fe;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#32325d;">     
                <center>
                    <img style="width: 50%; heigth:auto;" src="${imgMails}${array.image}" alt="Imagen de correo"> 
                </center>
                    ${array.text}
                <center>
                    <img style="width: 50%; heigth:auto;" src="${imgMails}${array.imageTwo}" alt="Imagen de correo2"> 
                </center>
                    ${array.textTwo}
                <style>h1{color:#32325d;}h2{color:#32325d;}h3{color:#32325d;}h4{color:#32325d;}h5{color:#32325d;}</style>
            </div>`
        }
    }
    
    try{
        const send = await KMails.sendMail(mail)
        res.json({status: 'ok'})
    }catch(err){
        res.send(err)
    }
    
})

clients.get('/', async (req, res) => {
    const Clients = await Cliente.find().sort({ultimaFecha: -1})
    res.json(Clients)
})

clients.get('/bestClient', async (req, res) => {
    const Clients = await Cliente.find().sort({participacion: -1})
    res.json(Clients)
})

clients.get('/findOne/:id', async (req, res) => {
    const Clients = await Cliente.findById(req.params.id)

    res.json(Clients)
})

clients.get('/onlyData', async (req, res) => {
    const Clients = await Cliente.find()
    res.json(Clients)
})

clients.get('/countClient', async (req, res) => {
    const Clients = await Cliente.find().count()
    res.json(Clients)
})

clients.get('/mails', async (req, res) => {
    const Clients = await Cliente.find()
    res.json(Clients)
})

clients.post('/datesPerClient', async (req, res) => {
    const Clients = await Citas.find({
        $and: [{client: {$regex: req.body.client}},{process:true}]
    })
    res.json(Clients)
})

// clients.get('/historical/:data', async (req, res) => {
//     const split = req.params.data.split('-')
//     const data = split[0]+' / '+split[1]
//     console.log(data)
//     const historical = await Venta.find({})
// })

clients.get('/dataDiscount/:ident', async (req, res) => {
    const Client = await Cliente.find({identidad: req.params.ident})
    res.json(Client)
})

clients.put('/deleteClient/:id', async (req, res) => {
    const Client = await Cliente.findByIdAndDelete(req.params.id)
    if (Client) {
        res.json({status: 'ok'})
    }
    res.json({status: 'bad'})
})

clients.post('/verifyClient', (req, res) => {
    var recoFinal = null
    if (req.body.referidoId != '') {
        Cliente.findById(req.body.referidoId)
        .then(recomender => {
            const data = {
                nombre: req.body.name,
                identidad: req.body.mail,
                correoCliente: req.body.number,
                instagramCliente: '',
                participacion: 0,
                recomendacion: recomender.nombre + ' / ' + recomender.identidad,
                idRecomendador:req.body.referidoId,
                recomendaciones: 0,
                historical: [],
                ultimaFecha: new Date(),
                fecha: new Date()
            }
            Cliente.findOne({identidad: data.identidad})
            .then(client => {
                if(client){
                    res.json({status: 'ok', data: client})
                }else{
                    Cliente.create(data)
                    .then(ready => {
                        res.json({status: 'bad', data: ready})
                    })
                    .catch(err => {
                        res.send(err)
                    })
                }
            })
            .catch(err => {
                res.send(err)
            })
        
        })
        .catch(err => {
            console.log(err)
        })
        
    }
    else{
        const data = {
            nombre: req.body.name,
            identidad: req.body.mail,
            correoCliente: req.body.number,
            instagramCliente: '',
            participacion: 0,
            recomendacion: recoFinal,
            idRecomendador:req.body.referidoId,
            recomendaciones: 0,
            historical: [],
            ultimaFecha: new Date(),
            fecha: new Date()
        }
        Cliente.findOne({identidad: data.identidad})
        .then(client => {
            if(client){
                res.json({status: 'ok', data: client})
            }else{
                Cliente.create(data)
                .then(ready => {
                    res.json({status: 'bad', data: ready})
                })
                .catch(err => {
                    res.send(err)
                })
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
    
})

clients.post('/', (req, res) => {
    let recommender = req.body.recomendador
    let finalRecommender = ''
    if (recommender == null) {
        finalRecommender = 'Ninguno'
    }
    else{
        finalRecommender = recommender
    }
    const today = new Date()
    const ClienteData = {
        nombre: req.body.nombre,
        identidad: req.body.identidad,
        correoCliente:req.body.correoCliente,
        instagramCliente: req.body.instagramCliente,
        participacion: req.body.ifCheck,
        recomendacion: finalRecommender,
        idRecomendador:req.body.idRecomender,
        recomendaciones:0,
        historical: [],
        ultimaFecha:today,
        fecha: today
    }

    Cliente.findOne({
        identidad: req.body.identidad
    })
    .then(cliente => {
        if (!cliente) {
            Cliente.create(ClienteData)
            .then(cliente => {
                res.json({status: 'Registrado'})  
            })
            .catch(err => {
                res.send(err)
            })
        }else{
            res.json({error: 'Cliente ya existe'})
        }
    })
    .catch(err => {
        res.send(err)
    })
})

clients.put('/:id', async (req, res, next) => {
    try {
        const findClient = await Cliente.findOne({
            identidad:req.body.identidadClienteEditar
        })
        if (!findClient) {
            try {
                console.log(req.body.correoClienteEditar)
                const updateClient = await Cliente.findByIdAndUpdate(req.params.id, {
                    $set: {
                      nombre:req.body.nombreClienteEditar,
                      identidad:req.body.identidadClienteEditar,
                      correoCliente: req.body.correoClienteEditar,
                      instagramCliente: req.body.instagramClienteEditar
                    }
                })
                if (updateClient) {
                    res.json({status: 'Servicio actualizado'})
                }
            } catch(err) {
                res.send('error: ' + err)
            }
            
        }else{
            if (findClient._id == req.params.id) {
                try {
                    const updateClient = await Cliente.findByIdAndUpdate(req.params.id, {
                        $set: {
                          nombre:req.body.nombreClienteEditar,
                          identidad:req.body.identidadClienteEditar,
                          correoCliente: req.body.correoClienteEditar,
                          instagramCliente: req.body.instagramClienteEditar
                        }
                    })
                    if (updateClient) {
                        res.json({status: 'Servicio actualizado'})
                    }
                } catch(err) {
                    res.send('error: ' + err)
                }
            }else{
                res.json({status: 'exist'})
            }
        }
    } catch(err) {
        res.send('error: ' + err)
    }
    
})

module.exports = clients