import { ticketModel } from "../models/ticket.model.js"
import {codeGenerator} from "../../controller/ticket.controller.js"

export default class TicketManager {
  async addTicket(ticket) {
    try {
      //ticket.code = codeGenerator()
      let result = await ticketModel.create(ticket);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }


  async readTicket(ticketCode){
    try {
      let resp = await ticketModel.findById({code: ticketCode})
      return resp
    } catch (error) {
      return { error: error.message }
    }
  }
}
