import { Layout } from "@/components/Layout";
import { Modal } from "@/components/Modal";
import { TableUploads } from "@/components/TableUploads";
import { ISale } from "@/interfaces/ISale";
import { deleteSale, getSales, postUpload } from "@/services/sale";
import { handleError } from "@/utils/error";
import { handleSuccess } from "@/utils/success";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [sales, setSales] = useState<ISale[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [saleId, setSaleId] = useState("");
  const [file, setFile] = useState<FileList | null>(null);

  useEffect(() => {
    async function getSalesData() {
      try {
        const request = await getSales();
        setSales(request.payload);
      } catch (error) {
        handleError(error, "Erro ao buscar dados de uploads");
      }
    }

    getSalesData();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeDeleteSaleModal = () => {
    setIsOpenDelete(false);
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
          const request = await getSales();
          setSales(request.payload);
        }, 1000);
      }
    } catch (error) {
      handleError(error, "Erro ao fazer upload do arquivo");
    }
  };

  const handleDeleteSale = async () => {
    try {
      const request = await deleteSale(saleId);

      if (request.isSuccess) {
        setSales(sales.filter((sale) => sale.id !== saleId))
        setSaleId("");
        handleSuccess("Venda deletada com sucesso!");
        closeDeleteSaleModal();
      }
    } catch (error) {
      handleError(error, "Ocorreu um erro ao deletar a venda");
    }
  };

  const openDeleteSaleModal = (saleId: string) => {
    setIsOpenDelete(true);
    setSaleId(saleId);
  };

  return (
    <Layout title="Dashboard">
      <Modal header="Upload de Vendas" dataCy="dashboard-modal-upload" isOpen={isOpen} onClose={closeModal}>
        <div className="mt-10 flex flex-col">
          <input
            type="file"
            accept=".txt"
            data-cy="dashboard-input-file"
            onChange={(e) => setFile(e.target.files)}
          />

          <button
            className="bg-blue-500 rounded py-2 px-4 text-white mt-10 hover:brightness-90  transition-all duration-150 disabled:brightness-90"
            data-cy="dashboard-button-send-file"
            onClick={handleFileUpload}
            disabled={!file}
          >
            Enviar
          </button>
        </div>
      </Modal>
      <Modal
        header="Tem certeza que deseja prosseguir?"
        dataCy="dashboard-modal-delete-sale"
        isOpen={isOpenDelete}
        onClose={closeDeleteSaleModal}
      >
        <div className="mt-10 flex flex-col">
          <p>Você não poderá reverter depois.</p>

          <div className="grid grid-cols-2 gap-2 ">
            <button
              className="bg-blue-500 rounded py-2 px-4 text-white mt-10 hover:brightness-90  transition-all duration-150 disabled:brightness-90"
              data-cy="dashboard-button-deny-delete"
              onClick={closeDeleteSaleModal}
            >
              Não
            </button>
            <button
              className="bg-red-500 rounded py-2 px-4 text-white mt-10 hover:brightness-90  transition-all duration-150 disabled:brightness-90"
              data-cy="dashboard-button-confirm-delete"
              onClick={handleDeleteSale}
            >
              Sim
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between items-center">
        <div>
          <h1 data-cy="dashboard-title" className="text-3xl flex">
            Dashboard
          </h1>
          <p data-cy="dashboard-subtitle">Lista de vendas cadastradas</p>
        </div>
        <div>
          <button
            className="border-none px-4 py-2 rounded-xl cursor-pointer mx-1 mb-1 text-white bg-blue-500 hover:brightness-75 transition-all duration-200 flex flex-row"
            data-cy="dashboard-button-upload"
            onClick={openModal}
          >
            Fazer <span className="hidden md:block ml-1">Upload</span>
          </button>
        </div>
      </div>

      <div className="mt-10">
        <TableUploads
          data={sales}
          rowsPerPage={5}
          onDeleteSale={openDeleteSaleModal}
        />
      </div>
    </Layout>
  );
}
