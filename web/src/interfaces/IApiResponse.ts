export interface IApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  payload: T;
}