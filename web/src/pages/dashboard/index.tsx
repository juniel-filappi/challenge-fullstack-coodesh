import { Layout } from "@/components/Layout";
import { TableUploads } from "@/components/TableUploads";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { IUpload } from "@/interfaces/IUpload";
import { getAPIClient } from "@/utils/axios";
import { GetServerSideProps } from "next";

interface DashboardProps {
  uploads: IUpload[];
}

export default function Dashboard({ uploads }: DashboardProps) {
  return (
    <Layout title="Dashboard">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl flex">
            {/* <FaUsers className="mr-2" /> */}
            Dashboard
          </h1>
          <p>Lista de vendas cadastradas</p>
        </div>
        <div>
          {/* <Link href="/colaborators/create">
            <button className="border-none px-4 py-2 rounded-xl cursor-pointer mx-1 mb-1 text-black bg-bluesx hover:brightness-75 transition-all duration-200 flex flex-row">
              Cadastrar{" "}
              <span className="hidden md:block ml-1">Colaborador</span>
            </button>
          </Link> */}
        </div>
      </div>

      <div className="mt-10">
        <TableUploads data={uploads} rowsPerPage={5} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const api = getAPIClient(ctx);
  const uploads = await api.get<IApiResponse<IUpload[]>>("/uploads");

  return {
    props: {
      uploads,
    },
  };
};
