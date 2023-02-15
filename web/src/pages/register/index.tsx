import nookies from "nookies";
import Head from "next/head";
import { Header } from "@/components/Header";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerValidation } from "@/validations/registerValidation";
import { register } from "@/services/auth";
import { handleError } from "@/utils/error";
import { useRouter } from "next/router";
import Link from "next/link";
import { handleSuccess } from "@/utils/success";

export default function Login() {
  const { push } = useRouter();
  const { errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: toFormikValidationSchema(registerValidation),
    onSubmit: async (values) => {
      try {
        const user = await register(values.name, values.email, values.password);

        if (user) {
          push("/login");
          handleSuccess("Conta criada com sucesso, faça o login para começar a registrar suas vendas")
        }
      } catch (error) {
        handleError(error, "Erro ao fazer cadastro");
      }
    },
  });
  return (
    <>
      <Head>
        <title>Registro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex justify-center">
        <div className="flex flex-col mt-14 w-[500px] px-5">
          <div className="text-center">
            <h1 data-cy="register-title" className="text-6xl font-bold mt-8">Registrar-se</h1>
            <p data-cy="register-subtitle" className=" px-2">Preencha os campos</p>
          </div>
          <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
              type="name"
              name="name"
              id="name"
              data-cy="register-input-name"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.name && <p data-cy="register-input-name-error" className="text-red-500">{errors.name}</p>}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              data-cy="register-input-email"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.email && <p data-cy="register-input-email-error" className="text-red-500">{errors.email}</p>}
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              data-cy="register-input-password"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.password && (
              <p data-cy="register-input-password-error" className="text-red-500">{errors.password}</p>
            )}
            <div className="pt-2">
              <p>
                Já tem uma conta?{" "}
                <Link
                  className="hover:text-blue-500 hover:underline transition-all duration-150"
                  data-cy="register-link-login"
                  href="/login"
                >
                  Faça o login
                </Link>
              </p>
            </div>
            <button
              className="bg-blue-500 py-2 px-4 rounded text-white hover:brightness-90 transition-all duration-150 mt-5"
              data-cy="register-button-submit"
              type="submit"
            >
              Criar conta
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
