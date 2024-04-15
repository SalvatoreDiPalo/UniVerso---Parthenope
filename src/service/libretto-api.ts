import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AppelloLibretto } from "../data/remote/AppelloLibretto";
import { ProvaLibretto } from "../data/remote/ProvaLibretto";
import { RigaLibretto } from "../data/remote/RigaLibretto";
import { TrattoCarriera } from "../data/remote/TrattoCarriera";
import { emptySplitApi } from "./api";
import { ExtendsIscrizioneAppello } from "../data/ExtendsIscrizioneAppello";
import { parse } from "date-fns";
import { AppelloLibrettoReq } from "../data/remote/req/AppelloLibrettoReq";
import { AppelloLibrettoByAdsceIdsReq } from "../data/remote/req/AppelloLibrettoByAdsceIdsReq";
import { RigaLibrettoReq } from "../data/remote/req/RigaLibrettoReq";
import { ProvaLibrettoReq } from "../data/remote/req/ProvaLibrettoReq";
import { ProvaLibrettoByAdsceIdsReq } from "../data/remote/req/ProvaLibrettoByAdsceIdsReq";
import { IscrizioneAppelloByAdsceIdsReq } from "../data/remote/req/IscrizioneAppelloByAdsceIdsReq";

export const librettiApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getAppelliPerRigaLibretto: build.query<
      AppelloLibretto[],
      AppelloLibrettoReq
    >({
      query: (params: AppelloLibrettoReq) => {
        const { matId, adsceId, q, order, filter } = params;
        return {
          url: `/libretto-service-v2/libretti/${matId}/righe/${adsceId}/appelli`,
          params: {
            ...(q ? { q: q } : {}),
            order: order ?? "+dataInizioApp",
            filter: filter,
            fields:
              "dataInizioApp,oraEsa,dataInizioIscr,dataFineIscr,adDes,presidenteCognome,presidenteNome,tipoEsaCod,tipoEsaCod.*,numIscritti,desApp,note",
          },
        };
      },
    }),
    getAppelliPerRigaLibrettoByAdsceIds: build.query<
      AppelloLibretto[],
      AppelloLibrettoByAdsceIdsReq
    >({
      queryFn: async (arg, queryApi, extraOptions, fetchWithBQ) => {
        const { matId, adsceIds, q, order } = arg;

        if (adsceIds.length == 0) {
          return {
            error: { status: 400, data: undefined } as FetchBaseQueryError,
          };
        }
        const results: AppelloLibretto[] = [];
        for (let index = 0; index < adsceIds.length; index++) {
          const element = adsceIds[index];
          const result = await fetchWithBQ({
            url: `/libretto-service-v2/libretti/${matId}/righe/${element}/appelli`,
            params: {
              q: q ?? "APPELLI_PRENOTABILI_E_FUTURI",
              order: order ?? "+dataInizioApp",
            },
          });
          if (result.error) {
            return { error: result.error as FetchBaseQueryError };
          }
          const newData: AppelloLibretto[] = result.data as AppelloLibretto[];
          results.push(...newData);
        }

        const defaultDate = new Date().toDateString();
        return {
          data: results.sort(
            (a, b) =>
              Date.parse(b.dataInizioApp ?? defaultDate) -
              Date.parse(a.dataInizioApp ?? defaultDate)
          ),
        };
      },
    }),
    getTrattiCarriera: build.query<TrattoCarriera[], string>({
      query: (order?: string) => {
        return {
          url: "/libretto-service-v2/libretti",
          params: {
            order: order ?? "-aaRegId",
          },
        };
      },
      keepUnusedDataFor: 30,
    }),
    getRigheLibretto: build.query<RigaLibretto[], RigaLibrettoReq>({
      query: (params: RigaLibrettoReq) => {
        const { matId, order } = params;
        return {
          url: `/libretto-service-v2/libretti/${matId}/righe`,
          params: {
            order: order ?? "+dataInizioApp",
          },
        };
      },
      keepUnusedDataFor: 30,
    }),
    getProveRigaLibretto: build.query<ProvaLibretto[], ProvaLibrettoReq>({
      query: (params: ProvaLibrettoReq) => {
        const { matId, adsceId, order } = params;
        return {
          url: `/libretto-service-v2/libretti/${matId}/righe/${adsceId}/prove`,
          params: {
            order: order ?? "-dataApp",
          },
        };
      },
    }),
    getProveRigaLibrettoByAdsceIds: build.query<
      ProvaLibretto[],
      ProvaLibrettoByAdsceIdsReq
    >({
      queryFn: async (arg, queryApi, extraOptions, fetchWithBQ) => {
        const { matId, adsceIds, order } = arg;

        if (adsceIds.length == 0) {
          return {
            error: { status: 400, data: undefined } as FetchBaseQueryError,
          };
        }
        const results: ProvaLibretto[] = [];
        for (let index = 0; index < adsceIds.length; index++) {
          const element = adsceIds[index];
          const result = await fetchWithBQ({
            url: `/libretto-service-v2/libretti/${matId}/righe/${element}/prove`,
            params: {
              order: order ?? "+dataInizioApp",
            },
          });
          if (result.error) {
            return { error: result.error as FetchBaseQueryError };
          }
          const newData: ProvaLibretto[] = result.data as ProvaLibretto[];
          results.push(...newData);
        }
        //TODO order
        const defaultDate = new Date().toDateString();
        return {
          data: results.sort(
            (a, b) =>
              Date.parse(b.dataApp ?? defaultDate) -
              Date.parse(a.dataApp ?? defaultDate)
          ),
        };
      },
    }),
    getPrenotazioniPerAdsceIds: build.query<
      ExtendsIscrizioneAppello[],
      IscrizioneAppelloByAdsceIdsReq
    >({
      queryFn: async (arg, queryApi, extraOptions, fetchWithBQ) => {
        const { matId, righeLibretto, order, optionalFields } = arg;

        if (righeLibretto.length == 0) {
          return {
            error: { status: 400, data: undefined } as FetchBaseQueryError,
          };
        }
        const results: ExtendsIscrizioneAppello[] = [];
        for (let index = 0; index < righeLibretto.length; index++) {
          const element: RigaLibretto = righeLibretto[index];
          const result = await fetchWithBQ({
            url: `/libretto-service-v2/libretti/${matId}/righe/${element.adsceId}/prenotazioni`,
            params: {
              order: order ?? "-dataOraTurno",
              optionalFields: optionalFields ?? "sesDes,dataOraTurno",
            },
          });
          if (result.error) {
            return { error: result.error as FetchBaseQueryError };
          }
          const newData: ExtendsIscrizioneAppello[] =
            result.data as ExtendsIscrizioneAppello[];

          results.push(
            ...newData.map((obj) => ({
              ...obj,
              adDes: element.adDes,
            }))
          );
        }
        return {
          data: results.sort(
            (a, b) =>
              parse(
                b.dataOraTurno,
                "dd/MM/yyyy HH:mm:ss",
                new Date()
              ).getTime() -
              parse(a.dataOraTurno, "dd/MM/yyyy HH:mm:ss", new Date()).getTime()
          ),
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAppelliPerRigaLibrettoQuery,
  useLazyGetAppelliPerRigaLibrettoQuery,
  useGetAppelliPerRigaLibrettoByAdsceIdsQuery,
  useGetTrattiCarrieraQuery,
  useLazyGetTrattiCarrieraQuery,
  useGetRigheLibrettoQuery,
  useLazyGetRigheLibrettoQuery,
  useGetProveRigaLibrettoQuery,
  useGetProveRigaLibrettoByAdsceIdsQuery,
  useGetPrenotazioniPerAdsceIdsQuery,
} = librettiApi;
