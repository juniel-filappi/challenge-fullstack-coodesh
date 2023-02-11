import { User } from "@prisma/client";

import { generateToken } from "../helpers/generateToken";
import { AuthRepository, ICreateUser } from "../repositories/AuthRepository";

export class AuthRepositoryInMemory implements AuthRepository {
  private users: User[] = [];

  async register(
    user: Omit<User, "id" | "created_at" | "updated_at">
  ): Promise<User> {
    const newUser = {
      ...user,
      id: Math.floor(Math.random() * 100),
      created_at: new Date(),
      updated_at: new Date(),
    };

    const userAlreadyExists = this.users.find(
      (user) => user.email === newUser.email
    );

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    this.users.push(newUser);

    return newUser;
  }

  async login({ email, password }: Omit<ICreateUser, "name">): Promise<{
    token: string;
    user: User;
  }> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      throw new Error("Usuário não existe");
    }

    if (user.password !== password) {
      throw new Error("Senha incorreta");
    }

    const token = generateToken(String(user.id), { email });

    return {
      token,
      user,
    };
  }

  async auth(userId: number): Promise<User | null> {
    const user = this.users.find((user) => user.id === userId) || null;

    return user;
  }
}
