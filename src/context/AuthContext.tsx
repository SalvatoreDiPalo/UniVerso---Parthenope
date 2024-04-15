import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLazyGetJwtQuery } from "../service/auth-api";
import base64 from "react-native-base64";
import {
  useLazyGetRigheLibrettoQuery,
  useLazyGetTrattiCarrieraQuery,
} from "../service/libretto-api";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { clearUser } from "../store/User/User";
import { Exception } from "../data/Exception";
import { WrapperAxiosError } from "../data/WrapperAxiosError";

const AuthContext = createContext({
  isAuthenticated: false,
  isDataLoading: false,
  isPageLoading: true,
  login: async (username: string, password: string) => {},
  refresh: async (token: string) => {},
  logout: () => {},
});

export default function AuthProvider(props: any) {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  const token = useSelector((state: RootState) => state.user.token);
  const accessTokenRef = useRef<string>();
  const dispatch = useAppDispatch();

  const [triggerJwt, { isSuccess: isJwtSuccess, isLoading: isJwtLoading }] =
    useLazyGetJwtQuery();
  const [
    triggerTratti,
    { isSuccess: isTrattiSuccess, isLoading: isTrattiLoading },
  ] = useLazyGetTrattiCarrieraQuery();
  const [
    triggerRighe,
    { isSuccess: isRigheSuccess, isLoading: isRigheLoading },
  ] = useLazyGetRigheLibrettoQuery();

  async function loadUser(token: string) {
    const { error: jwtError } = await triggerJwt(token);
    if (jwtError) {
      throw new Exception(
        "Errore durante la login",
        jwtError as WrapperAxiosError
      );
    }
    const { data: dataTratti, error: errorTratti } = await triggerTratti(
      "-aaRegId"
    );
    if (errorTratti || !dataTratti || dataTratti.length == 0) {
      throw new Exception(
        "Errore nel caricamento dei tratti",
        errorTratti ? (errorTratti as WrapperAxiosError) : undefined
      );
    }
    const { error: errorRighe } = await triggerRighe({
      matId: dataTratti[0].matId,
    });
    if (errorRighe) {
      throw new Exception(
        "Errore nel caricamento del paino di studi",
        errorRighe ? (errorRighe as WrapperAxiosError) : undefined
      );
    }
    accessTokenRef.current = token;
  }

  const login = async (username: string, password: string) => {
    try {
      const credentials = formatBase64(username, password);
      await loadUser(credentials);
    } catch (error) {
      console.log("Errore ricevuto dal metodo login nell'auth", error);
      throw error;
    }
  };

  const refresh = async (token: string) => {
    try {
      await loadUser(token);
    } catch (error) {
      console.log("Errore ricevuto dal metodo refresh login nell'auth", error);
      throw error;
    }
  };

  const logout = () => {
    dispatch(clearUser());
    accessTokenRef.current = undefined;
  };

  useEffect(() => {
    setIsPageLoading(false);
    if (token) {
      refresh(token);
    }
  }, []);

  const areAllRequestSuccess =
    isJwtSuccess && isTrattiSuccess && isRigheSuccess;
  const isAuthenticated = areAllRequestSuccess && !!accessTokenRef.current;
  const isDataLoading = isJwtLoading || isTrattiLoading || isRigheLoading;

  return (
    <AuthContext.Provider
      value={{
        isPageLoading,
        isAuthenticated,
        isDataLoading,
        login,
        refresh,
        logout,
      }}
      {...props}
    ></AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext must be within AuthProvider");
  }

  return context;
};

function formatBase64(username: string, password: string): string {
  return base64.encode(`${username}:${password}`);
}
