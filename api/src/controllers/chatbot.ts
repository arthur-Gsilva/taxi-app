import { Request, RequestHandler, Response } from "express"
import { chatbotMotorista } from "../models/chatbot";

export const chatbotController: RequestHandler = async (req, res): Promise<void> => {
    const { driverId, mensagem } = req.body;

    if (!driverId || !mensagem) {
        res.status(400).json({ error: "Motorista ID e mensagem são obrigatórios." });
    }

    try {
        const resposta = await chatbotMotorista(Number(driverId), mensagem);
        res.json({ resposta });
        return
      } catch (error) {
        res.status(500).json({ error: "Erro no servidor. Tente novamente mais tarde." });
        return
      }
}