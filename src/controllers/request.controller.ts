import { Request, Response } from "express";
import claudeService from "../service/claude.service";
import logger from "../loaders/logger";

export const PostApi = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { rol, contenido } = req.body;

  if (!contenido || contenido.trim() === '') {
    res.status(400).json({ error: "El contenido del mensaje no puede estar vacío" });
    return;
  }

  try {
    const mensaje = await claudeService.createMessage({ rol, contenido });
    res.json(mensaje);
  } catch (error) {
    logger.error(`Error al enviar mensaje a Claude: ${error}`);
    res.status(500).json({ error: "Hubo un error al procesar tu solicitud" });
  }
};
export const ProcessFileApi = async (
  req: Request,
  res: Response
): Promise<void> => {


  //guard clausse
  if (!req.file) {
    res.status(400).json({ error: "no hay archivo" });
    return;
  }

  const file = req.file.buffer;

  try {
    const respuesta = await claudeService.processFile(file);
    res.json(respuesta);
  } catch (error) {
    logger.error(`Error al procesar el archivo: ${error}`);
    res.status(500).json({ error: "Hubo un error al procesar tu solicitud" });
  }
};