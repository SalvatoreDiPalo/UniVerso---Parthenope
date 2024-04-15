import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "./Themed";

interface Props {
  message?: string;
  materialCommunityIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export default function EmptyFlatList(props: Props) {
  let { message, materialCommunityIcon } = props;
  if (!materialCommunityIcon) {
    materialCommunityIcon = "book-off-outline";
  }
  if (!message) {
    message = "AGGIUNGERE MESSAGGIO DI DEFAULT";
  }
  return (
    <View
      style={{
        flexGrow: 1,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons
        name={materialCommunityIcon}
        size={24}
        color="black"
      />
      <Text>{message}</Text>
    </View>
  );
}
