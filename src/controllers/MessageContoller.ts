import axios from "axios";
import { Request, Response } from "express";


export class MessageController {
    async sendText(request: Request, response: Response){
        const { 
            phones, message
         } = request.body
         const apiUrl = "https://app.whatsgw.com.br/api/WhatsGw/Send";
        // Construa o objeto JSON com os dados da mensagem
        for (const i of phones) {
            const messageData = {
                "apikey" : "22590b11-eee2-4235-a551-62b17ef42df3",
                "phone_number" : "18639492315",
                "contact_phone_number" : i.phone.toString(),
                "message_custom_id" : "yoursoftwareid",
                "message_type" : "text",
                "message_body" : `${message}`,
                "check_status" : "1"
            };
            // Envie a mensagem via WhatsApp    
             axios.post(apiUrl, messageData)
        }
        

        return response.json();
    }
    
}