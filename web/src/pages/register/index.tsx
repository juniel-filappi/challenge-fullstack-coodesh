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
            <h1 className="text-6xl font-bold mt-8">Registrar-se</h1>
            <p className=" px-2">Preencha os campos</p>
          </div>
          <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
              type="name"
              name="name"
              id="name"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <div className="pt-2">
              <p>
                Já tem uma conta?{" "}
                <Link
                  className="hover:text-blue-500 hover:underline transition-all duration-150"
                  href="/login"
                >
                  Faça o login
                </Link>
              </p>
            </div>
            <button
              className="bg-blue-500 py-2 px-4 rounded text-white hover:brightness-90 transition-all duration-150 mt-5"
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
