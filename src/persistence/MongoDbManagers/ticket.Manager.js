import { ticketModel } from "../models/ticket.model.js"

export default class TicketManager {
  async addTicket(ticket) {
    try {
      //ticket.code = uuidv4();
      let result = await ticketModel.create(ticket);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}
