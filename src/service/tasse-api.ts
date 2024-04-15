import { emptySplitApi } from "./api";
import { AddebitoStudente } from "../data/remote/AddebitoStudente";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TaxWrapper } from "../data/TaxWrapper";
import { TrattoCarriera } from "../data/remote/TrattoCarriera";
import { AddebitoStudenteReq } from "../data/remote/req/AddebitoStudenteReq";

export const tasseApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getListaAddebitiStudente: build.query<
      AddebitoStudente[],
      AddebitoStudenteReq
    >({
      query: (params: AddebitoStudenteReq) => {
        const { stuId, aaId, order } = params;
        return {
          url: "/tasse-service-v1/addebiti-studente",
          params: {
            stuId: stuId,
            aaId: aaId,
            order: order ?? "",
          },
        };
      },
    }),
    getListaAddebitiStudenteByAaIds: build.query<
      TaxWrapper[],
      TrattoCarriera[]
    >({
      queryFn: async (arg, queryApi, extraOptions, fetchWithBQ) => {
        if (arg.length == 0) {
          return {
            error: { status: 400, data: undefined } as FetchBaseQueryError,
          };
        }
        const results: TaxWrapper[] = [];
        for (let index = 0; index < arg.length; index++) {
          const element: TrattoCarriera = arg[index];
          const result = await fetchWithBQ({
            url: "/tasse-service-v1/addebiti-studente",
            params: {
              stuId: element.stuId,
              aaId: element.aaRegId,
              order: "-aaRegId",
            },
          });
          if (result.error) {
            return { error: result.error as FetchBaseQueryError };
          }
          const newData: AddebitoStudente[] = result.data as AddebitoStudente[];
          const taxWrapper: TaxWrapper = {
            cdsDes: element.cdsDes!,
            aaId: element.aaRegId!,
            staStuDes: element.staStuDes!,
            numTratto: index + 1,
            taxes: newData.filter((tax) => tax.annullataFlg === 0),
          };
          results.push(taxWrapper);
        }

        //TODO order
        return {
          data: results,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetListaAddebitiStudenteQuery,
  useGetListaAddebitiStudenteByAaIdsQuery,
} = tasseApi;
