import { emptySplitApi } from "./api";
import { IscrizioneAnnuale } from "../data/remote/IscrizioneAnnuale";

export const carriereApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getIscrAnn: build.query<IscrizioneAnnuale[], number>({
      query: (stuId: number) => {
        return {
          url: `/carriere-service-v1/carriere/${stuId}/iscrizioni`,
          params: {
            ultimaIscrizioneFlg: 1,
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetIscrAnnQuery } = carriereApi;
