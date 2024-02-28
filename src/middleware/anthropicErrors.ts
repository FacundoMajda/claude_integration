import { Request, Response, NextFunction } from 'express'
import logger from "../loaders/logger";

interface APIError extends Error {
    status: number;
    name: string;
    headers: Record<string, string>;
}

const errorMiddleware = (err: APIError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error Status: ${err.status}, Error Name: ${err.name}, Message: ${err.message}`);
  
  const errorResponse = {
    status: err.status,
    error: err.name,
    message: err.message,
    headers: err.headers,
  };

  switch(err.status) {
    case 400:
      res.status(400).json({ ...errorResponse, description: 'BadRequestError' });
      break;
    case 401:
      res.status(401).json({ ...errorResponse, description: 'AuthenticationError' });
      break;
    case 403:
      res.status(403).json({ ...errorResponse, description: 'PermissionDeniedError' });
      break;
    case 404:
      res.status(404).json({ ...errorResponse, description: 'NotFoundError' });
      break;
    case 422:
      res.status(422).json({ ...errorResponse, description: 'UnprocessableEntityError' });
      break;
    case 429:
      res.status(429).json({ ...errorResponse, description: 'RateLimitError' });
      break;
    default:
      if (err.status >= 500) {
        res.status(500).json({ ...errorResponse, description: 'InternalServerError' });
      } else {
        res.status(500).json({ ...errorResponse, description: 'APIConnectionError' });
      }
  }
}

export default errorMiddleware;