import { RootState } from "./store";
import { RigaLibretto } from "@/src/data/remote/RigaLibretto";
import { StatoAppelloEnum } from "@/src/data/remote/enum/StatoAppelloEnum";

export const selectMatId = (state: RootState) =>
  state.user.userInfo.carriera?.matId ?? -1;

  export const selectStuId = (state: RootState) =>
  state.user.userInfo.carriera?.stuId ?? -1;

export const selectRigheLibretto = (state: RootState) =>
  state.user.righeLibretto ?? [];

export const selectSumExamsWeight = (state: RootState) =>
  (state.user.righeLibretto ?? []).reduce(
    (a: number, b: RigaLibretto) => a + (b.peso ?? 0),
    0
  );

export const selectAdsceIdsOfExamsToEnrollInFromRigheLibretto = (
  state: RootState
) =>
  (state.user.righeLibretto ?? [])
    .filter((riga) => riga.stato.value !== StatoAppelloEnum.S.toString())
    .map((riga) => riga.adsceId);

export const selectAdsceIdsFromRigheLibretto = (state: RootState) =>
  (state.user.righeLibretto ?? []).map((riga) => riga.adsceId);

export const selectCarriedOutExams = (state: RootState) =>
  (state.user.righeLibretto ?? []).filter(
    (riga) => riga.stato.value === StatoAppelloEnum.S
  );
