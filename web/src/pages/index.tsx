import Head from 'next/head'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <>
     <Head>
        <title>Welcome to the challange</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <main className="flex justify-center">
        <div className="flex flex-col items-center mt-14">
          <h1 className="text-6xl font-bold mt-8" data-cy="text-welcome">
            Bem vindo ao sistema da Coodesh
          </h1>
          <p className=" px-2">
            Neste sistema você poderá realizar o upload de suas vendas.
          </p>

          <h3 className="text-xl mt-10 px-2 ">
            Para dar continuidade no upload, clique no botão abaixo e faça o login: 👇
          </h3>

          <div className="mt-5">
            <Link href="/login" className="bg-blue-500 py-2 px-4 rounded text-white hover:brightness-90 transition-all duration-150" data-cy="button-login"> Acessar </Link>
          </div>
        </div>
      </main>
    </>
  )
}
