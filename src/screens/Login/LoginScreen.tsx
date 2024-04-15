import { useState } from "react";
import { TextInput, View } from "react-native";
import { Text, WhiteView } from "../../components/Themed";
import { MatPressable } from "../../components/MatPressable";
import SvgComponent from "./component/SvgComponent";
import { Constants as MyConstants } from "@/src/constants/Constant";
import { useAuth } from "@/src/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { WrapperAxiosError } from "@/src/data/WrapperAxiosError";
import { Exception } from "@/src/data/Exception";
import { styles } from "./style";

export default function LoginScreen() {
  const [form, setForm] = useState<FormData>({
    username: {
      value: "",
      hasError: false,
    },
    password: {
      value: "",
      hasError: false,
    },
    disableInputs: false,
    disableButton: true,
  });
  const [showPassword, setShopPassword] = useState(false);
  const [eyeIcon, setEyeIcon] =
    useState<keyof typeof MaterialIcons.glyphMap>("visibility-off");

  const { login } = useAuth();

  const handleInputChange = (inputName: string, value: string) => {
    setForm((prevValue) => {
      const updatedInput = {
        ...(prevValue[inputName as keyof typeof prevValue] as object),
        value,
        hasError: false,
      };

      const updatedFormState = {
        ...prevValue,
        [inputName]: updatedInput,
      };

      updatedFormState.disableButton =
        updatedFormState.username.value.trim() === "" ||
        updatedFormState.password.value.trim() === "";

      return updatedFormState;
    });
  };

  const changePwdType = () => {
    setEyeIcon(showPassword ? "visibility" : "visibility-off");
    setShopPassword((prevState) => !prevState);
  };

  const executeLogin = async () => {
    setForm((prevValue) => ({
      ...prevValue,
      error: undefined,
      disableInputs: true,
      disableButton: true,
    }));
    try {
      await login(form.username.value, form.password.value);
    } catch (error) {
      console.error("Errore ricevuto dalla login", error);
      const exception = error as Exception;
      const axiosError: WrapperAxiosError | undefined = exception.axiosError
        ? (exception.axiosError as WrapperAxiosError)
        : undefined;

      const retCode = axiosError?.responseData?.retCode ?? 0;
      let errorMessage = getErrorMessage(retCode);

      setForm((prevValue) => ({
        ...prevValue,
        username: {
          ...prevValue.username,
          hasError: retCode === 1116,
        },
        password: {
          ...prevValue.password,
          hasError: retCode === 1003,
        },
        error: errorMessage,
        disableInputs: false,
        disableButton: false,
      }));
    }
  };

  return (
    <WhiteView style={styles.container}>
      <SvgComponent
        height={"100%"}
        width={MyConstants.totalWidth}
        viewBox="0 0 375 644"
        preserveAspectRatio="none"
      />
      <WhiteView style={styles.itemsContainer}>
        <WhiteView style={styles.form}>
          <TextInput
            style={[
              styles.input,
              {
                borderWidth: form.username.hasError ? 1 : 0,
              },
            ]}
            placeholder="CODICE FISCALE"
            onChangeText={(text) => handleInputChange("username", text)}
            value={form.username.value}
            editable={!form.disableInputs}
          />
          <View>
            <TextInput
              style={[
                styles.input,
                styles.password,
                {
                  borderWidth: form.password.hasError ? 1 : 0,
                },
              ]}
              onChangeText={(text) => handleInputChange("password", text)}
              value={form.password.value}
              placeholder="Password unica di Ateneo"
              secureTextEntry={!showPassword}
              editable={!form.disableInputs}
            />
            <MaterialIcons
              name={eyeIcon}
              size={24}
              color="black"
              style={styles.showPasswordIcon}
              onPress={changePwdType}
            />
          </View>
          {form.error && (
            <Text
              style={{
                color: "#DD4000",
                paddingHorizontal: 16,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {form.error}
            </Text>
          )}
          <MatPressable onPress={executeLogin} disabled={form.disableButton}>
            <Text style={styles.buttonText}>Accedi</Text>
          </MatPressable>
        </WhiteView>
      </WhiteView>
    </WhiteView>
  );
}

const getErrorMessage = (retCode: number) => {
  switch (retCode) {
    case 1116:
      return "Username non valido";
    case 1003:
      return "Password non valida";
    default:
      return "Errore durante l'accesso";
  }
};

interface FormData {
  username: InputData;
  password: InputData;
  error?: string;
  disableInputs: boolean;
  disableButton: boolean;
}

interface InputData {
  value: string;
  hasError: boolean;
}
