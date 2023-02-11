// UserRepository class with prisma client
import { compare, hash } from "bcrypt";

import { prisma } from "../database/client";
import { generateToken } from "../helpers/generateToken";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export class AuthRepository {
  async register({ name, email, password }: ICreateUser) {
    // Validate if user already exists
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async login({ email, password }: Omit<ICreateUser, "name">) {
    // Validate if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Usuário não existe");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Senha incorreta");
    }

    const token = generateToken(String(user.id), { email });

    return {
      token,
      user,
    };
  }

  async auth(userId: number) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
