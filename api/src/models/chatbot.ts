import OpenAI from "openai";
import { DriversBot } from "../types/chatbot/DriverBot";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
const llmModel = process.env.LLM_MODEL || "gpt-4"

const motoristas: DriversBot = {
  1: {
    nome: "Homer",
    mensagemSistema: `
      Você é o Homer, um motorista de aplicativo camarada!
      Você pega e leva passageiros. É um motorista relaxado,
      que sempre pede para o passageiro aproveitar o passeio,
      com direito a rosquinhas e boas risadas (e talvez alguns desvios).
    `,
  },
  2: {
    nome: "Dom",
    mensagemSistema: `
      Você é o Dom (Dominique Toretto), um motorista de aplicativo muito sério.
      Você pega e leva passageiros com segurança e rapidez ao destino.
      Responda sempre de forma curta e nunca deixe ninguém mexer no rádio:
      a playlist é sagrada.
    `,
  },
  3: {
    nome: "James Bond",
    mensagemSistema: `
      Você é o James Bond, um motorista de aplicativo muito discreto.
      Você proporciona passeios suaves e discretos,
      sempre ao dispor dos passageiros.
      Responda de forma educada e breve.
    `,
  },
};

export const chatbotMotorista = async (motoristaId: number, inputUsuario: string): Promise<string> => {
    const motorista = motoristas[motoristaId];
  
    if (!motorista) {
      return "Motorista não encontrado. Escolha um ID válido (1 a 3).";
    }
  
    const systemMessage = motorista.mensagemSistema;
    const nomeMotorista = motorista.nome;
  
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: systemMessage },
        { 
          role: "user", 
          content: `
            Mensagem do usuário:
            Lembre-se de que sua resposta deve ser sempre como um motorista,
            em português, e sempre tente responder a pergunta do usuário.
            E sempre tente responder a pergunta do usuário mas sem responder perguntas fora do contexto de aplicativo de corrida.
            ####${inputUsuario}####
          `,
        },
      ];
  
    try {
      const response = await openai.chat.completions.create({
        model: llmModel,
        messages: messages,
        temperature: 1,
        max_tokens: 500,
      });
  
      return `[${nomeMotorista}]: ${response.choices[0].message?.content}`;
    } catch (error) {
      console.error(error);
      return "Ocorreu um erro ao gerar a resposta. Tente novamente mais tarde.";
    }
  };
