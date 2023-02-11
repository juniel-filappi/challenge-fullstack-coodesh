import { AuthRepositoryInMemory } from "../in-memory/AuthRepositoryInMemory";

let authRepository: AuthRepositoryInMemory;

describe("Login User", () => {
  beforeEach(() => {
    authRepository = new AuthRepositoryInMemory();
  });

  it("should be able to login a user", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    await authRepository.register(user);

    const { token, user: loggedUser } = await authRepository.login(user);

    expect(loggedUser).toHaveProperty("id");
    expect(token).not.toBeNull();
  });

  it("should not be able to login a non existing user", async () => {
    expect(
      authRepository.login({
        email: "teste1@teste.com",
        password: "123456",
      })
    ).rejects.toEqual(new Error("Usuário não existe"));
  });

  it("should be able return auth user", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    await authRepository.register(user);

    const { user: loggedUser } = await authRepository.login(user);

    const authUser = await authRepository.auth(loggedUser.id);

    expect(authUser).toHaveProperty("id");
  });
});
