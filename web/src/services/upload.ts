import { IApiResponse } from "@/interfaces/IApiResponse";
import { IUpload } from "@/interfaces/IUpload";
import { api } from "@/utils/api";

export const postUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<IApiResponse<IUpload[]>>("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export const getUploads = async () => {
  const response = await api.get<IApiResponse<IUpload[]>>("/uploads");

  return response.data;
}
