import axios from "axios";

const apiUrl = "https://app.whatsgw.com.br/api/WhatsGw/Send";

export async function SendMessageToMe(
    fone: string,
    message: string,

){    
    const messageData = {
        "apikey" : `${process.env.API_KEY_MESSAGE_WHATSAPP}`,
        "phone_number" : `${process.env.PHONE_NUMBER_SEND}`,
        "contact_phone_number" : fone.toString(),
        "message_custom_id" : "yoursoftwareid",
        "message_type" : "text",
        "message_body" : message,
        "check_status" : "1"
    };
    await axios
      .post(apiUrl, messageData)
      .then((response) => {
        console.log("Mensagem enviada com sucesso:", response.data);
        // Lide com a resposta da API, se necessário
      })
      .catch((error) => {
        console.error("Erro ao enviar a mensagem:", error);
        // Lide com erros, se necessário
      });
}


export async function SendMessageToAdmin(message: string) {
    const messageData2 = {
        "apikey" : `${process.env.API_KEY_MESSAGE_WHATSAPP}`,
        "phone_number" : `${process.env.PHONE_NUMBER_SEND}`,
        "contact_phone_number" : `${process.env.PHONE_NUMBER_ADMIN}`,
        "message_custom_id" : "yoursoftwareid",
        "message_type" : "text",
        "message_body" : message,
        "check_status" : "1"
      };
    await axios
      .post(apiUrl, messageData2)
      .then((response) => {
        console.log("Mensagem enviada com sucesso:", response.data);
        // Lide com a resposta da API, se necessário
      })
      .catch((error) => {
        console.error("Erro ao enviar a mensagem:", error);
        // Lide com erros, se necessário
      });
}