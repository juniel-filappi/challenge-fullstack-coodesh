import { IApiResponse } from "@/interfaces/IApiResponse";
import { ILoginResponse } from "@/interfaces/ILoginResponse";
import { api } from "@/utils/api";

export const login = async (email: string, password: string) => {
  const response = await api.post<IApiResponse<ILoginResponse>>("/login", {
    email,
    password,
  });

  return response.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post<IApiResponse<ILoginResponse>>("/register", {
    name,
    email,
    password,
  });

  return response.data;
}