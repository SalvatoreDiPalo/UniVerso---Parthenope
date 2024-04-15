import { emptySplitApi } from "./api";
import { JwtModel } from "../data/remote/JwtModel";

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getJwt: build.query<JwtModel, string>({
      query: (param: string) => {
        return {
          url: `/login/jwt/new`,
          headers: {
            Authorization: "Basic " + param,
          },
        };
      },
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: true,
});

export const { useGetJwtQuery, useLazyGetJwtQuery } = authApi;
