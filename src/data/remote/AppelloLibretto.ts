export interface AppelloLibretto {
  aaCalId?: number;
  adCod?: string;
  adDes?: string;
  adId?: number;
  adsceId?: number;
  appId?: number;
  appelloId?: number;
  cdsCod?: string;
  cdsDes?: string;
  cdsId?: number;
  condId?: number;
  dataFineIscr: string;
  dataInizioApp: string;
  dataInizioIscr: string;
  desApp?: string;
  matId?: number;
  note?: string;
  numIscritti?: number;
  numPubblicazioni?: number;
  numVerbaliCar?: number;
  numVerbaliGen?: number;
  oraEsa?: string;
  presidenteCognome?: string;
  presidenteId?: number;
  presidenteNome?: string;
  riservatoFlg?: number;
  stato?: string;
  statoAperturaApp?: string;
  statoDes?: string;
  statoInsEsiti?: StatoInsEsiti;
  statoLog?: string;
  statoPubblEsiti?: StatoPubblEsiti;
  statoVerb?: StatoVerb;
  tipoAppCod?: string;
  tipoDefAppCod?: string;
  tipoDefAppDes?: string;
  tipoEsaCod?: TipoEsaCod;
  tipoGestAppCod?: string;
  tipoGestAppDes?: string;
  tipoGestPrenCod?: string;
  tipoGestPrenDes?: string;
  tipoIscrCod?: TipoIscrCod;
  tipoSceltaTurno?: number;
}

export interface StatoInsEsiti {
  value?: string;
}

export interface StatoPubblEsiti {
  value?: string;
}

export interface StatoVerb {
  value?: string;
}

export interface TipoEsaCod {
  value?: string;
}

export interface TipoIscrCod {
  value?: string;
}
