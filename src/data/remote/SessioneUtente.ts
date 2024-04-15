export interface SessioneUtente {
  user: User;
  authToken: string;
  internalAuthToken?: string;
  expPwd: boolean;
  credentials?: Credentials;
  jwt?: string;
  profili?: Profili[];
}

export interface User {
  firstName: string;
  lastName: string;
  sex?: string;
  codFis?: string;
  idAb?: number;
  persId?: number;
  docenteId?: number;
  soggEstId?: number;
  id: number;
  grpId: number;
  grpDes: string;
  sessionTimeout?: number;
  userId: string;
  tipoFirmaId?: number;
  tipoFirmaFaId?: number;
  aliasName?: string;
  trattiCarriera?: TrattiCarriera[];
}

export interface TrattiCarriera {
  stuId: number;
  matId: number;
  matricola: string;
  cdsId: number;
  cdsDes: string;
  staStuCod: string;
  staStuDes: string;
  motStastuCod?: string;
  motStastuDes?: string;
  staMatCod: string;
  staMatDes: string;
  dettaglioTratto?: DettaglioTratto;
}

export interface DettaglioTratto {
  profCod: string;
  facCod: string;
  facId: number;
  stuId: number;
  matId: number;
  cdsCod: string;
  cdsId: number;
  aaOrdId: number;
  pdsCod: string;
  pdsId: number;
  iscrId: number;
  staStuCod: string;
  motStastuCod: string;
  staMatCod: string;
  motStamatCod: string;
  staIscrCod: string;
  motStaiscrCod: string;
  annoCorso: number;
  anniFC: number;
  aaIscrId: number;
  durataAnni: number;
  ultimoAnnoFlg: number;
  condFlg: number;
  domiscrFlg: number;
  tipoCorsoCod: string;
  aaRegId: number;
  tipoSpecCod: string;
  tipoIscrCod: string;
  passaggioFlg: number;
  notaBloccanteFlg: number;
  mobilFlg: number;
  ptFlg: number;
  normId: number;
  tipoCatAmmId: number;
}

export interface Credentials {
  kind: string;
  profile?: string;
  jwtKeyId?: string;
  user?: string;
}

export interface Profili {
  grpId: number;
  des: string;
  userId: string;
}
