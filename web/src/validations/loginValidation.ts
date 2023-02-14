import { z } from "zod";

export const loginValidation = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
      invalid_type_error: "Email inválido",
    })
    .email({
      message: "Email inválido",
    }),
  password: z.string({
    required_error: "Senha é obrigatória",
    invalid_type_error: "Senha inválida",
  }).min(6, {
    message: "Senha deve ter no mínimo 6 caracteres",
  }),
});
