import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { apiMessage } from "../helpers/apiMessage";

interface IPayload {
  sub: string;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  // Bearer token
  const [, token] = authHeader.split(" ");
  try {
    const { sub } = verify(token, process.env.JWT_SECRET!) as IPayload;

    req.user_id = sub;

    return next();
  } catch (error) {
    return next(error);
  }
}
