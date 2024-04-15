import { emptySplitApi } from "./api";

export const anagraficaApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getFotoPersona: build.query<Blob, number>({
      query: (persId: number) => {
        return {
          url: `/anagrafica-service-v2/persone/${persId}/foto`,
          responseType: "blob",
          headers: {
            Accept: "application/octet-stream"
          }
        };
      },
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: true,
});

export const { useGetFotoPersonaQuery } = anagraficaApi;
