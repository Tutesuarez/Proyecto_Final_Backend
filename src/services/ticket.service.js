import TicketManager from '../persistence/MongoDbManagers/ticket.Manager.js';


const ticketManager = new TicketManager

export const createTicket = async (ticket) => await ticketManager.addTicket(ticket)
export const readTicket = async(ticketCode) => await ticketManager.readTicket(ticketCode)

