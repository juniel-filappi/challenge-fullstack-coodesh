import axios from "axios";
import * as express from "express";
import * as next from "next";
import { parseCookies } from "nookies";

export function getAPIClient(
  ctx?:
    | Pick<next.NextPageContext, "req">
    | {
        req: next.NextApiRequest;
      }
    | {
        req: express.Request;
      }
    | null
    | undefined
) {

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const { "token": token } = parseCookies(ctx);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
}
