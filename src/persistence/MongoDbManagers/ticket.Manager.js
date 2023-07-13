import { ticketModel } from "../models/ticket.model.js"
import {codeGenerator} from "../../controller/ticket.controller.js"

export default class TicketManager {
  async addTicket(ticket) {
    try {
      ticket.code = codeGenerator()
      let result = await ticketModel.create(ticket);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}
