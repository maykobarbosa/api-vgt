import axios from "axios";
import { Request, Response } from "express";
import { SendMessageToMe } from "../utils/sendMessage";


export class MessageController {
    async sendText(request: Request, response: Response){
        const { 
            phones, message
         } = request.body
        // Construa o objeto JSON com os dados da mensagem
        for (const i of phones) {

            await SendMessageToMe(
                i.phone.toString(), 
                `${message}`
            )            
        }
        

        return response.json();
    }
    
}