export interface IscrizioneAppello {
    applistaId: number
    cdsId: number
    adId: number
    appId: number
    appLogId: number
    stuId: number
    adregId: number
    adsceId: number
    matId: number
    adStuCod: string
    adStuDes: string
    cdsAdStuCod: string
    cdsAdStuDes: string
    cdsAdIdStu: number
    desAppello: string
    desTurno: string
    dataOraTurno: string
    aaFreqId: number
    statoAdsce: string
    pesoAd: number
    userId: string
    matricola: string
    nomeStudente: string
    nomeAlias: string
    cognomeStudente: string
    codFisStudente: string
    dataNascitaStudente: string
    sessoStudente: string
    comuNascCodIstat: string
    cittStraNasc: string
    cittCod: string
    cdsStuCod: string
    cdsStuDes: string
    cdsIdStu: number
    aaOrdStuId: number
    pdsStuCod: string
    pdsStuDes: string
    pdsIdStu: number
    pubblId: number
    presaVisione: string
    userIdPresaVisione: string
    userGrpPresaVisione: number
    dataRifEsito: string
    dataRifEsitoStu: string
    notaPubbl: string
    gruppoVotoCod: string
    gruppoVotoMaxPunti: number
    esito: Esito
    manualeFlg: number
    dataEsa: string
    domandeEsame: string
    notaStudente: string
    tipoSvolgimentoEsameCod: string
    tipoSvolgimentoEsameDes: string
    tipoSvolgimentoEsameRichiestaFlg: string
    tagCod: string
    autoTagCod: string
    livUscitaCod: string
    linguaUscitaCod: string
    dataIns: string
    tipoDefAppCod: string
    tipoGestPrenCod: string
    tipoGestAppCod: string
    tipoAppCod: string
    posiz: number
    posizApp: number
    dataInizioIscr: string
    dataFineIscr: string
    tipoIscrCod: string
    tipoEsaCod: string
    aaCalId: number
    aaSesId: number
    sesDes: string
    misureCompensative: MisureCompensative[]
    warnings: Warning[]
  }
  
  export interface Esito {
    modValCod: string
    superatoFlg: number
    votoEsa: number
    tipoGiudCod: string
    tipoGiudizioDes: string
    assenteFlg: number
    ritiratoFlg: number
  }
  
  export interface MisureCompensative {
    applistaId: number
    cdsId: number
    adId: number
    appId: number
    appLogId: number
    stuId: number
    misuraCompensativaCod: string
    desLiberaFlg: number
    visWebFlg: number
    des: string
  }
  
  export interface Warning {
    applistaId: number
    cdsId: number
    adId: number
    appId: number
    appLogId: number
    stuId: number
    tipoErrore: string
    des: string
  }
  