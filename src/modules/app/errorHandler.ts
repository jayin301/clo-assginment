export class BadRequestError extends Error {}
import { Request, Response } from "express";
import logger from "../../config/logger";

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next?: any
) {
  logger.error(error?.message);

  if (error instanceof BadRequestError) {
    response.status(400).json({ message: error?.message });
  } else {
    response.status(500).json({ message: error?.message });
  }
}
