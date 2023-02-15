import { IApiResponse } from "@/interfaces/IApiResponse";
import { ISale } from "@/interfaces/ISale";
import { api } from "@/utils/api";

export const postUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<IApiResponse<ISale[]>>("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export const getSales = async () => {
  const response = await api.get<IApiResponse<ISale[]>>("/sales");

  return response.data;
}

export const deleteSale = async (saleId: string) => {
  const response = await api.delete<IApiResponse<object>>(`sale/${saleId}`);

  return response.data;
}