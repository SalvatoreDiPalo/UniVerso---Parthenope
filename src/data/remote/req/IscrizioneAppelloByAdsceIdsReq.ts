import { RigaLibretto } from "../RigaLibretto";

export interface IscrizioneAppelloByAdsceIdsReq {
    matId: number;
    righeLibretto: RigaLibretto[];
    order?: string;
    optionalFields?: string;
  }