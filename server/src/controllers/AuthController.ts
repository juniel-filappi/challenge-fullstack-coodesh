// User controller
import { User } from "@prisma/client";
import { Request, Response } from "express";

import { apiMessage } from "../helpers/apiMessage";
import { AuthRepository } from "../repositories/AuthRepository";
import { validateLogin, validateRegister } from "../validations/authValidator";

export class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password } = validateRegister.parse(req.body);
    const authRepository = new AuthRepository();
    const user: User = await authRepository.register({
      name,
      email,
      password,
    });

    return res.send(apiMessage(true, 200, "User registered", user));
  }

  async login(req: Request, res: Response) {
    const { email, password } = validateLogin.parse(req.body);
    const authRepository = new AuthRepository();
    const user = await authRepository.login({
      email,
      password,
    });

    return res.send(apiMessage(true, 200, "Login successful", user));
  }

  async me(req: Request, res: Response) {
    const { user_id } = req;
    const authRepository = new AuthRepository();

    const user = await authRepository.auth(Number(user_id));

    return res.send(apiMessage(true, 200, "User authenticated", user));
  }
}
