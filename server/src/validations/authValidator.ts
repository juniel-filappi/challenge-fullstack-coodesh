import { z } from "zod";

export const validateLogin = z.object({
  email: z.string({
    required_error: "O campo email é obrigatório!",
    invalid_type_error: "O campo email deve ser do tipo string!",
  }).email({
    message: "O campo email deve ser um email válido!"
  }),
  password: z.string({
    required_error: "O campo senha é obrigatório!",
    invalid_type_error: "O campo senha deve ser do tipo string!",
  }),
});

export const validateRegister = z.object({
  name: z.string({
    required_error: "O campo nome é obrigatório!",
    invalid_type_error: "O campo nome deve ser do tipo string!",
  }),
  email: z.string({
    required_error: "O campo email é obrigatório!",
    invalid_type_error: "O campo email deve ser do tipo string!",
  }).email({
    message: "O campo email deve ser um email válido!"
  }),
  password: z.string({
    required_error: "O campo senha é obrigatório!",
    invalid_type_error: "O campo senha deve ser do tipo string!",
  }),
});
