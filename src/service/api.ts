import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { Constants } from "../constants/Constant";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { RootState } from "../store/store";
import { ApiError } from "../data/remote/ApiError";
import { WrapperAxiosError } from "../data/WrapperAxiosError";

const url = Constants.api_url;

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      responseType?: AxiosRequestConfig["responseType"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, responseType }, api) => {
    const state = api.getState() as RootState;
    const token = state.user.token;
    const existHeaderAuthorization =
      headers !== undefined && headers["Authorization"] !== undefined;
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          ...(existHeaderAuthorization
            ? { Authorization: headers["Authorization"] }
            : { Authorization: `Basic ${token}` }),
        },
        responseType,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.error("Error api", err.message, err.code, err.response);
      const responseData = err.response?.data as ApiError;
      const responseStatus = err.response?.status;

      return {
        error: {
          ...err,
          responseStatus,
          responseData,
        } as WrapperAxiosError,
      };
    }
  };

export const emptySplitApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: url! }),
  reducerPath: "queryApi",
  endpoints: () => ({}),
});
