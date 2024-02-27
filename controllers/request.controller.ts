import "dotenv/config";
import { Request, Response } from "express";
import Anthropic from '@anthropic-ai/sdk';
import logger from "../loaders/logger";

// config de la clave de API
const anthropic = new Anthropic({
  apiKey: process.env.API_CLAUDE,
});

interface Mensaje {
  rol: string;
  contenido: string;
}

// Uso básico de la API
// Documentación: https://github.com/anthropics/anthropic-sdk-typescript?tab=readme-ov-file#usage

export const PostApi = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { rol, contenido } = req.body;

  try {
    const mensaje = await anthropic.messages.create(
      {
        model: "claude-2.1",
        max_tokens: 1024,
        temperature: 0,
        messages: [{ "role": rol, "content": contenido }],
      },
      {
        maxRetries: 3,
        timeout: 5 * 1000, 
      }
    );
    res.json(mensaje);
  } catch (error) {
    logger.error(`Error al enviar mensaje a Claude: ${error}`);
    res.status(500).json({ error: "Hubo un error al procesar tu solicitud" });
  }
};