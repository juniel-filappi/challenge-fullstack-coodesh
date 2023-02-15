import nookies from "nookies";
import Head from "next/head";
import { Header } from "@/components/Header";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginValidation } from "@/validations/loginValidation";
import { login } from "@/services/auth";
import { handleError } from "@/utils/error";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const { push } = useRouter();
  const { errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(loginValidation),
    onSubmit: async (values) => {
      try {
        const user = await login(values.email, values.password);

        if (user) {
          push("/dashboard");
          nookies.set(null, "token", user.payload.token, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60,
          });
        }
      } catch (error) {
        handleError(error, "Erro ao fazer login");
      }
    },
  });
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex justify-center">
        <div className="flex flex-col mt-14 w-[500px] px-5">
          <div className="text-center">
            <h1 data-cy="title-login" className="text-6xl font-bold mt-8">Login</h1>
            <p data-cy="subtitle-login" className=" px-2">Faça o login para continuar</p>
          </div>
          <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              data-cy="login-input-email"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              data-cy="login-input-password"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <div className="pt-2">
              <p>
                Não tem uma conta?{" "}
                <Link
                  className="hover:text-blue-500 hover:underline transition-all duration-150"
                  data-cy="login-link-register"
                  href="/register"
                >
                  Faça o cadastro
                </Link>
              </p>
            </div>
            <button
              className="bg-blue-500 py-2 px-4 rounded text-white hover:brightness-90 transition-all duration-150 mt-5"
              data-cy="login-button-submit"
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
