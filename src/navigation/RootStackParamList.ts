import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppelloLibretto } from "../data/remote/AppelloLibretto";
import { TaxWrapper } from "@/src/data/TaxWrapper";

export type RootStackParamList = {
  Home: undefined;
  CalendarioAppelli: undefined;
  AppelliPrenotati: undefined;
  AppelliPrenotabili: undefined;
  Appello: { item: AppelloLibretto };
  Libretto: undefined;
  Tasse: undefined;
  TasseAnnuali: { item: TaxWrapper };
  Login: undefined;
  Splash: undefined;
  Statistics: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type AppelliPrenotatiProps = NativeStackScreenProps<
  RootStackParamList,
  "AppelliPrenotati"
>;
export type AppelliPrenotabiliProps = NativeStackScreenProps<
  RootStackParamList,
  "AppelliPrenotabili"
>;
export type AppelloDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "Appello"
>;
export type AnnualTaxesProps = NativeStackScreenProps<
  RootStackParamList,
  "TasseAnnuali"
>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;
export type SplashProps = NativeStackScreenProps<RootStackParamList, "Splash">;
