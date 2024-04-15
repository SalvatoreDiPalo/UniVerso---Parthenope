import { UserSchema } from "@/src/data/UserSchema";
import { RootState } from "@/src/store/store";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CardButton from "./components/CardButton";
import { useGetFotoPersonaQuery } from "@/src/service/anagrafica-api";
import { useEffect, useState } from "react";
import { Constants } from "@/src/constants/Constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WhiteView } from "@/src/components/Themed";
import { useAuth } from "@/src/context/AuthContext";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState<ImageSourcePropType>(
    Constants.images.defaultProfile
  );
  const user: UserSchema = useSelector(
    (state: RootState) => state.user.userInfo
  );

  const { data, isLoading, isError } = useGetFotoPersonaQuery(user.persId!);

  useEffect(() => {
    if (data && !isError) {
      let base64data;
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(data);
      fileReaderInstance.onload = () => {
        base64data = fileReaderInstance.result;
        setImage({ uri: base64data?.toString() });
      };
    }
  }, [isLoading]);

  return (
    <View style={{ flex: 1 }}>
      <WhiteView
        style={[
          styles.profileHeader,
          {
            marginTop: 16 + insets.top,
          },
        ]}
      >
        <Image style={styles.image} source={image} />
        <WhiteView style={{ flex: 1 }}>
          <Text style={styles.name}>
            {`${user.lastName} ${user.firstName}`.toLowerCase()}
          </Text>
          <Text style={styles.matricola}>{user.carriera?.matricola}</Text>
        </WhiteView>
      </WhiteView>

      <ScrollView style={styles.actionsContainer}>
        <CardButton
          title="Anagrafica"
          materialIcon="account-circle"
          pressableProps={{
            disabled: true,
          }}
          pressableStyle={{
            opacity: 0.5,
          }}
        />
        <CardButton
          title="Impostazioni"
          materialIcon="settings"
          pressableProps={{
            onPress: () => console.log("Impostazioni"),
            disabled: true,
          }}
          pressableStyle={{
            opacity: 0.5,
          }}
        />
        <CardButton
          title="Disconnettiti"
          materialIcon="logout"
          pressableProps={{ onPress: logout }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    borderRadius: 16,
    marginHorizontal: 36,
    marginBottom: 16,
    elevation: 8,
    height: 126,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 8,
    paddingHorizontal: 8,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
  },
  name: {
    fontWeight: "bold",
    fontSize: 22,
    textTransform: "capitalize",
  },
  matricola: {
    fontSize: 16,
    color: "grey",
  },
  actionsContainer: {
    flex: 2,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    elevation: 4,
  },
});
