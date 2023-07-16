import {
  readTicket as readTicketservices,
} from '../services/ticket.service.js'



const sendMessage = async () =>{

  try {
    const ticket = await readTicketservices(code)
    await transporter.sendMail({
        //to: ticket.purchaser,
        to: 'suarezmatiasjose@gmail.com',
        subjet:'Gracias por su compra',
        text:'este es el primer email'
    })
    res.status(200).send(' Mail Sent')
} catch (error) {
    res.status(500).json({ message: error })
}
}


export default sendMessage()
