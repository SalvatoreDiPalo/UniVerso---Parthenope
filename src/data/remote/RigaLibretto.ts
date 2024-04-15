export interface RigaLibretto {
  matId: number;
  ord: number;
  adsceId: number;
  stuId: number;
  pianoId?: number;
  itmId?: number;
  ragId?: number;
  raggEsaTipo?: string;
  adCod?: string;
  adDes: string;
  annoCorso: number;
  stato: Stato;
  statoDes: string;
  chiaveADContestualizzata?: ChiaveAdcontestualizzata;
  tipoEsaCod?: string;
  tipoEsaDes?: string;
  tipoInsCod?: string;
  tipoInsDes?: string;
  ricId: number;
  peso: number;
  aaFreqId?: number;
  dataFreq?: string;
  freqUffFlg: number;
  freqObbligFlg: number;
  dataScadIscr: string;
  gruppoVotoId: number;
  gruppoVotoMinVoto: number;
  gruppoVotoMaxVoto: number;
  gruppoVotoLodeFlg: number;
  gruppoGiudCod: string;
  gruppoGiudDes: string;
  esito: Esito;
  sovranFlg: number;
  note?: string;
  debitoFlg: number;
  ofaFlg?: number;
  annoCorsoAnticipo?: number;
  genAutoFlg: number;
  genRicSpecFlg: number;
  tipoOrigEvecar?: number;
  urlSitoWeb?: string;
  infoDottorati?: InfoDottorati;
  rilFreq?: RilFreq[];
  statoMissione?: string;
  statoMissioneDes?: string;
  numAppelliPrenotabili?: number;
  superataFlg?: number;
  numPrenotazioni?: number;
}

export interface ChiaveAdcontestualizzata {
  cdsId: number;
  cdsCod?: string;
  cdsDes?: string;
  aaOrdId: number;
  aaOrdCod?: string;
  aaOrdDes?: string;
  pdsId: number;
  pdsCod?: string;
  pdsDes?: string;
  aaOffId: number;
  adId: number;
  adCod?: string;
  adDes?: string;
  afId?: number;
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

export interface InfoDottorati {
  soggettoErogante?: string;
  destinazione?: string;
  dataPartenza?: string;
  dataArrivo?: string;
  noteStu?: string;
  adFuoriOffFlg?: number;
  missioneFlg?: number;
  ricercaFlg?: number;
  periodoEsteroFlg?: number;
  aziendaFlg?: number;
}

export interface RilFreq {
  matId?: number;
  adsceRilId?: number;
  aaRilevazioneId?: number;
  adsceId?: number;
  stuTipoCorsoCod?: string;
  statoAdsceRil?: string;
  aaFreqId?: number;
  dataFreq?: string;
  staSceCod?: string;
  totOrePerFreq?: number;
  totRilPerFreq?: number;
  percPresPerFreq?: number;
  percOrePresPerFreq?: number;
  numRil?: number;
  oreRil?: number;
  numAss?: number;
  numPres?: number;
  oreAss?: number;
  orePres?: number;
  oreTotFreqAd?: number;
  numTotFreqAd?: number;
  dataFreqRilFreqDett?: string;
  dataFreqAdLog?: string;
}

export interface Stato {
  value: string;
}
