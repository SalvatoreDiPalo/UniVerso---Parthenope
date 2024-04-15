export interface UserSchema {
  id?: number;
  persId?: number;
  sex?: string;
  userId?: string;
  codFis?: string;
  firstName?: string;
  lastName?: string;
  carriera?: CarrieraSchema;
  modifyDate?: number;
  persistedTheme: string;
  persistedLanguage: string;
  isFirstInstall: boolean;
}

export interface CarrieraSchema {
  matricola?: string;
  matId?: number;
  stuId?: number;
  cdsId?: number;
  cdsDes?: string;
}
