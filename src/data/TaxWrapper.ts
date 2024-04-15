import { AddebitoStudente } from "./remote/AddebitoStudente";

export interface TaxWrapper {
  cdsDes: string;
  aaId: number;
  staStuDes: string;
  numTratto: number;
  taxes: AddebitoStudente[];
}
