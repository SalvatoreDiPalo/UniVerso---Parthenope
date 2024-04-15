import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { RootStackParamList } from "@/src/navigation/RootStackParamList";

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function Panel({ navigation }: Props) {
  return (
    <View style={styles.nestedPanelHeader}>
      <Pressable
        style={styles.iconButton}
        onPress={() => navigation.navigate("Libretto")}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="trophy-outline"
            size={32}
            color="#356EFD"
          />
        </View>
        <Text style={styles.iconButtonText}>Libretto</Text>
      </Pressable>
      <Pressable
        style={styles.iconButton}
        onPress={() => navigation.navigate("CalendarioAppelli")}
      >
        <View style={styles.iconContainer}>
          <FontAwesome6 name="book" size={32} color="#356EFD" />
        </View>
        <Text style={styles.iconButtonText}>Appelli</Text>
      </Pressable>
      <Pressable
        style={styles.iconButton}
        onPress={() => navigation.navigate("Tasse")}
      >
        <View style={styles.iconContainer}>
          <FontAwesome5 name="landmark" size={32} color="#356EFD" />
        </View>
        <Text style={styles.iconButtonText}>Tasse</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nestedPanelHeader: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 12,
    height: 150,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    columnGap: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    elevation: 2,
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
  },
  iconButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  iconContainer: {
    backgroundColor: "#EBF1FE",
    width: 76,
    height: 76,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
