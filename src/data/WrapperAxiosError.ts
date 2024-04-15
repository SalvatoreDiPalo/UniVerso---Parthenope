import { AxiosError } from "axios";
import { ApiError } from "./remote/ApiError";

export interface WrapperAxiosError extends AxiosError {
  responseData?: ApiError;
  responseStatus?: number;
}
