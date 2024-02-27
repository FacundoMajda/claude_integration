//referencia en la documentacion:
//https://github.com/anthropics/anthropic-sdk-typescript?tab=readme-ov-file#handling-errors
//https://docs.anthropic.com/claude/reference/errors

import { Request, Response, NextFunction } from 'express'
import logger from "../loaders/logger";

interface APIError extends Error {
    status: number;
    name: string;
    headers: Record<string, string>;
}

const errorMiddleware = (err: APIError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error Status: ${err.status}, Error Name: ${err.name}`);
  
  switch(err.status) {
    case 400:
      res.status(400).send('BadRequestError');
      break;
    case 401:
      res.status(401).send('AuthenticationError');
      break;
    case 403:
      res.status(403).send('PermissionDeniedError');
      break;
    case 404:
      res.status(404).send('NotFoundError');
      break;
    case 422:
      res.status(422).send('UnprocessableEntityError');
      break;
    case 429:
      res.status(429).send('RateLimitError');
      break;
    default:
      if (err.status >= 500) {
        res.status(500).send('InternalServerError');
      } else {
        res.status(500).send('APIConnectionError');
      }
  }
}

export default errorMiddleware;