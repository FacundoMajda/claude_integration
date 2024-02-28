import { Request, Response, NextFunction } from 'express';
import logger from '../loaders/logger';

interface backendError extends Error {
  status?: number;
  details?: any;
}

const errors = (err: backendError, req: Request, res: Response, next: NextFunction): void => {
  const status = err.status || 500;
  
  logger.error({
    message: `Error: ${err.message}`,
    status: `Status: ${status}`,
    url: `URL: ${req.originalUrl}`,
    method: `Method: ${req.method}`,
    body: `Body: ${JSON.stringify(req.body)}`,
    params: `Params: ${JSON.stringify(req.params)}`,
    ...(err.details && { details: `Details: ${JSON.stringify(err.details)}` }),
  });

  const errorResponse = {
    message: '¡Algo salió mal!',
    error: err.message,
    ...(err.details && { details: err.details }),
  };

  res.status(status).json(errorResponse);
};

export default errors;