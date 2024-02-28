import "dotenv/config";
import Anthropic from '@anthropic-ai/sdk';
import logger from "../loaders/logger";

// Configuración de la clave de API
const anthropic = new Anthropic({
  apiKey: process.env.API_CLAUDE,
});

interface Mensaje {
  rol: 'user' | 'assistant';
  contenido: string;
}

// Uso básico de la API
// Documentación: https://github.com/anthropics/anthropic-sdk-typescript?tab=readme-ov-file#usage
const claudeService = {
  createMessage: async (mensaje: Mensaje) => {
    try {
      const respuesta = await anthropic.messages.create(
        {
          model: "claude-2.1",
          max_tokens: 1024,
          temperature: 0,
          messages: [{ "role": mensaje.rol, "content": mensaje.contenido }],
        },
        {
          maxRetries: 3,
          timeout: 5 * 1000, 
        }
      );
      return respuesta;
    } catch (error) {
      logger.error(`Error al enviar mensaje a Claude: ${error}`);
      throw new Error("Hubo un error al procesar tu solicitud");
    }
  },

  processFile: async (file: Buffer) => {
    try {
      // Convertir el archivo Buffer a string
      const contenido = file.toString();
  
      const respuesta = await anthropic.messages.create(
        {
          model: "claude-2.1",

          // Máximo de tokens para consumir un archivo
          //CLAUDE 2.1 posee 200k

          max_tokens: 200000,
          temperature: 0,
          
          // Roles = user || assistant
          // Por defecto en este caso, user
          messages: [{ "role": "user", "content": contenido }],
        },
        {
          timeout: 5 * 1000, 
        }
      );
      return respuesta;
    } catch (error) {
      logger.error(`Error al procesar el archivo: ${error}`);
      throw new Error("Hubo un error al procesar tu solicitud");
    }
  }
}
export default claudeService;