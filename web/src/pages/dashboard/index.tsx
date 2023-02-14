import { Layout } from "@/components/Layout";
import { Modal } from "@/components/Modal";
import { TableUploads } from "@/components/TableUploads";
import { IUpload } from "@/interfaces/IUpload";
import { getUploads, postUpload } from "@/services/upload";
import { handleError } from "@/utils/error";
import { handleSuccess } from "@/utils/success";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [uploads, setUploads] = useState<IUpload[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);

  useEffect(() => {
    async function getUploadsData() {
      try {
        const request = await getUploads();
        setUploads(request.payload);
      } catch (error) {
        handleError(error, "Erro ao buscar dados de uploads");
      }
    }

    getUploadsData();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setFile(null);
    setIsOpen(true);
  };

  const handleFileUpload = async () => {
    try {
      if (!file) {
        throw new Error("Nenhum arquivo selecionado");
      }
      const request = await postUpload(file[0]);

      if (request) {
        closeModal();
        handleSuccess("Upload realizado com sucesso");
        // refresh data
        setTimeout(async () => {
          const request = await getUploads();
          setUploads(request.payload);
        }, 1000);
      }
    } catch (error) {
      handleError(error, "Erro ao fazer upload do arquivo");
    }
  };

  return (
    <Layout title="Dashboard">
      <Modal header="Upload de Vendas" isOpen={isOpen} onClose={closeModal}>
        <div className="mt-10 flex flex-col">
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setFile(e.target.files)}
          />

          <button
            className="bg-blue-500 rounded py-2 px-4 text-white mt-10 hover:brightness-90  transition-all duration-150 disabled:brightness-90"
            onClick={handleFileUpload}
            disabled={!file}
          >
            Enviar
          </button>
        </div>
      </Modal>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl flex">
            {/* <FaUsers className="mr-2" /> */}
            Dashboard
          </h1>
          <p>Lista de vendas cadastradas</p>
        </div>
        <div>
          <button
            className="border-none px-4 py-2 rounded-xl cursor-pointer mx-1 mb-1 text-white bg-blue-500 hover:brightness-75 transition-all duration-200 flex flex-row"
            onClick={openModal}
          >
            Fazer <span className="hidden md:block ml-1">Upload</span>
          </button>
        </div>
      </div>

      <div className="mt-10">
        <TableUploads data={uploads} rowsPerPage={5} />
      </div>
    </Layout>
  );
}
