import { Constants as MyConstants } from "@/src/constants/Constant";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#356EFD",
    paddingTop: Constants.statusBarHeight,
  },
  itemsContainer: {
    position: "absolute",
    bottom: 0,
    top: "40%",
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    justifyContent: "center",
  },
  form: {
    backgroundColor: "transparent",
    width: MyConstants.totalWidth - 60,
    height: 60,
    borderRadius: 30,
    margin: 30,
    justifyContent: "center",
    paddingLeft: 10,
  },
  input: {
    height: 60,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "whitesmoke",
    borderRadius: 8,
    padding: 10,
    elevation: 0,
    borderColor: "#DD4000",
  },
  password: {
    paddingRight: 48,
  },
  showPasswordIcon: {
    position: "absolute",
    right: 32,
    top: 25,
  },
  buttonText: {
    alignContent: "center",
    alignSelf: "center",
    color: "#fff",
    fontWeight: "600",
    lineHeight: 24.75,
    textTransform: "uppercase",
  },
});
