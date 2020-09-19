const Pedido = require('../models/Pedidos');
const email = require('../modelsMails/Mails')
const kmailCredentials = require('../private/kmail-credentials')
const imgMails = require('../private/endpoints.js')
const KMails = new email(kmailCredentials)


function verify(){
    setInterval(() => {
        Pedido.find({estado:'Nconfirmado'})
        .then(ped=>{
            let date = new Date()
            for (let i = 0; i < ped.length; i++) {
                const element = ped[i];
                var diff = (date.getTime() - element.date.getTime()) / (1000*60*60*24);
                console.log(diff)
                if ( parseInt(diff) == 5 || parseInt(diff) == 6) {
                    mail = {
                        from: "KKPrettynails",
                        to: element.contacto,
                        subject: 'Tu pedido esta por vencer',
                        html: `
                        <div style="width: 100%; padding:0;text-align:center;">
                        <div style="width: 60%;height: 8vh;margin: auto;background-color: #fdd3d7;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                            <div style="width: 100px;margin:auto;border-radius:55%;background-color:#f8f9fa;padding: 10px;">     
                                <img style="width: 100%;margin-bottom:40px;" src="https://kkprettynails.cl/img/logokk.png" alt="Logo kkprettynails">
                            </div>
                        </div>
                        <div style="width: 800px;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;padding-bottom: 20px;">
                            <center>
                                <div style="width:80%;text-align: center;">
                                    <h1 style="text-align: center;color:#172b4d;"> </h1>
                                    <p style="text-align:center;margin-top:10px;font-size:18px;"> <strong>Estimado(a) ${element.cliente} <br> Su pedido: Gift Card por: ${element.articulo} esta a punto de vencerse, tiene un plazo de 2 dias o el estado de su pedido pasara a vencido y no podra realizar el pago de este</p>
                                    <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 60%;margin:auto;"><strong> 
                                        
                                        </strong>
                                    </p>
                                <div>
                            </center>
                        </div>
                        <div style="width: 60%;background-color: #f0f1f3;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);margin: auto;padding: 20px;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;padding-bottom:20px;-webkit-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);-moz-box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);box-shadow: 0px -4px 11px 0px rgba(0,0,0,0.12);">
                                <center>
                                <div style="width:60%;">
                                    <center>
                                    <p style="text-align:center;font-size:18px;">Contáctanos.</p>
                                <a href="mailto:kkprettynails@gmail.com"><img style="width: 4%;" src="https://kkprettynails.cl/img/maill.png" alt=""></a>
                                <a href="https://www.instagram.com/kkprettynails/?hl=es-la"><img style="width: 4.4%;margin-left:20px" src="https://kkprettynails.cl/img/ig.png" alt=""></a>
                                <a href="https://wa.me/56972628949"><img style="width:4%;margin-left:20px" src="https://kkprettynails.cl/img/ws.png" alt=""></a>
                                <a href="https://kkprettynails.cl"><img style="width: 4%;margin-left:20px" src="https://kkprettynails.cl/img/web.png" alt=""></a>
                                <a  href="https://goo.gl/maps/m5rVWDEiPj7q1Hxh9" style="margin-left:20px;text-decoration:none;">
                                    <img style="width:4%;margin-left:20px;" src="https://kkprettynails.cl/img/market.png" alt="Logo web">
                                </a>
                                </center>
                                </div>
                                </center>
                            </div>
                        </div>
                    `
                    }
                    KMails.sendMail(mail)
                    
                }
                else if (parseInt(diff) > 7) {
                    Pedido.findByIdAndUpdate(element._id, {estado:'vencido',dateProccess:new Date()})
                    .then(ready =>{})
                }
                
            }
        })
    }, 86400000);
}

module.exports = verify