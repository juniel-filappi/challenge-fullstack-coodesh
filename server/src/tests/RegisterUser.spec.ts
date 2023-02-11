import { AuthRepositoryInMemory } from "../in-memory/AuthRepositoryInMemory";

let authRepository: AuthRepositoryInMemory;

describe("Register User", () => {
  beforeEach(() => {
    authRepository = new AuthRepositoryInMemory();
  });

  it("should be able to register a new user", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const newUser = await authRepository.register(user);

    expect(newUser).toHaveProperty("id");
  });

  it("should not be able to register a new user with an existing email", async () => {
    expect(async () => {
      const user = {
        name: "John Doe",
        email: "teste@teste.com",
        password: "123456",
      };

      await authRepository.register(user);
      await authRepository.register(user);
    }).rejects.toBeInstanceOf(Error);
  });
});
