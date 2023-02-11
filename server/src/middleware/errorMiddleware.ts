import { Request, Response, NextFunction } from "express";

import { apiMessage } from "../helpers/apiMessage";

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  if (err.issues) {
    res.status(400).send(apiMessage(false, 400, "", err.issues));
  }

  res.status(errStatus).send(apiMessage(false, errStatus, errMsg));
};

export default ErrorHandler;
