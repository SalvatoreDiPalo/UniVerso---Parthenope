import { Constants } from "@/src/constants/Constant";
import { UserSchema } from "@/src/data/UserSchema";
import { RigaLibretto } from "@/src/data/remote/RigaLibretto";
import { TrattoCarriera } from "@/src/data/remote/TrattoCarriera";
import { authApi } from "@/src/service/auth-api";
import { librettiApi } from "@/src/service/libretto-api";
import { createSlice } from "@reduxjs/toolkit";

interface NavigationState {
  token?: string;
  userInfo: UserSchema;
  righeLibretto?: RigaLibretto[];
  trattiCarriera?: TrattoCarriera[];
}

const initialState: NavigationState = {
  token: undefined,
  userInfo: emptyUser(),
  righeLibretto: undefined,
  trattiCarriera: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setRigheLibretto: (state, action) => {
      state.righeLibretto = action.payload;
    },
    setTrattiCarriera: (state, action) => {
      state.trattiCarriera = action.payload;
    },
    clearUser: (state) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.getJwt.matchFulfilled,
      (state, action) => {
        state.token = action.meta.arg.originalArgs;
      }
    );
    builder.addMatcher(
      librettiApi.endpoints.getTrattiCarriera.matchFulfilled,
      (state, { payload }) => {
        const user = mapLibrettoToUser(payload[0]);
        state.userInfo = user;
        state.trattiCarriera = payload;
      }
    );
    builder.addMatcher(
      librettiApi.endpoints.getRigheLibretto.matchFulfilled,
      (state, { payload }) => {
        state.righeLibretto = payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserInfo,
  setToken,
  clearUser,
  setRigheLibretto,
  setTrattiCarriera,
} = userSlice.actions;

function emptyUser(): UserSchema {
  return {
    isFirstInstall: true,
    persistedTheme: Constants.default_theme,
    persistedLanguage: Constants.default_language,
  } as UserSchema;
}

function mapLibrettoToUser(libretto: TrattoCarriera): UserSchema {
  return {
    firstName: libretto.nome,
    lastName: libretto.cognome,
    codFis: libretto.codiceFiscale,
    persId: libretto.persId,
    carriera: {
      matId: libretto.matId,
      matricola: libretto.matricola,
      cdsDes: libretto.cdsDes,
      cdsId: libretto.cdsId,
      stuId: libretto.stuId,
    },
  } as UserSchema;
}
