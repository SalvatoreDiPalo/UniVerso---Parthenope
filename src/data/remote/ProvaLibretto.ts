export interface ProvaLibretto {
  adregId: number;
  adsceId: number;
  matId: number;
  staRegCod?: string;
  staRegDes?: string;
  applistaId?: number;
  tipoAppCod?: string;
  cdsEsaId?: number;
  adEsaId?: number;
  sesId?: number;
  sesDes?: string;
  tipoIscrCod?: string;
  dataApp?: string;
  esitoFinale?: Esito;
  esitoScr?: Esito;
  esitoParziale?: Esito;
  tipoNoSupCod?: string;
  tipiNosupDes?: string;
  tipoNoCarCod?: string;
  tipoNoCarDes?: string;
  lottoId?: number;
  verbId?: number;
  errNum?: number;
  errDes?: string;
  errDesWeb?: string;
}

export interface Esito {
  modValCod: string;
  supEsaFlg: number;
  voto?: number;
  lodeFlg?: number;
  tipoGiudCod?: string;
  tipoGiudDes?: string;
  dataEsa?: string;
  aaSupId?: number;
}
