import { formatCentsValueToPtBr, formatDateTimeToPtBr } from "@/helpers";
import useTable from "@/hooks/useTable";
import { ISale } from "@/interfaces/ISale";
import { useState } from "react";
import { IconButton } from "../IconButton";
import { TrashIcon } from "../TrashIcon";
import TableFooter from "./TableFooter";

interface TableProps {
  data: ISale[];
  rowsPerPage: number;
  onDeleteSale: (saleId: string) => void;
}

export const TableUploads = ({ data, rowsPerPage, onDeleteSale }: TableProps) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const sumValues = data.reduce((acc, el) => acc + parseFloat(el.value), 0);

  return (
    <>
      <div className="overflow-x-auto relative rounded-md">
        <table data-cy="dashboard-table" className="w-full text-md text-center text-white">
          <thead className="text-lg bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-6"></th>
              <th className="py-3 px-6">Tipo</th>
              <th className="py-3 px-6">Data</th>
              <th className="py-3 px-6">Produto</th>
              <th className="py-3 px-6">Valor</th>
              <th className="py-3 px-6">Vendedor</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((el) => (
              <tr key={el.id} className="border-b bg-black border-gray-700">
                <td className="py-4 px-6 font-medium whitespace-nowrap text-white">
                  <IconButton
                    className="ml-2 hover:bg-red-500"
                    dataCy="dashboard-button-delete-sale"
                    onClick={() => onDeleteSale(el.id)}
                  >
                    <TrashIcon />
                  </IconButton>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-white">
                  {el.type.description}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-white">
                  {formatDateTimeToPtBr(el.date)}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-gray-400">
                  {el.product}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-gray-400">
                  {formatCentsValueToPtBr(parseFloat(el.value))}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap text-gray-400">
                  {el.salesman}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end pt-2">
        <p>Total: <b>{formatCentsValueToPtBr(sumValues)}</b></p>
      </div>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};
