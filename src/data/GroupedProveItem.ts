import { ProvaLibretto } from "./remote/ProvaLibretto";

export interface GroupedProveItem {
  adCod: string;
  adDes: string;
  options: ProvaLibretto[];
}
