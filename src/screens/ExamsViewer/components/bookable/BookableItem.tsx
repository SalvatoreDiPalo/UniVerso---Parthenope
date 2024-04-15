import { Text, WhiteView } from "@/src/components/Themed";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppelloLibretto } from "@/src/data/remote/AppelloLibretto";
import { FontAwesome6 } from "@expo/vector-icons";

export default function BookableItem({
  item,
  onPress,
}: {
  item: AppelloLibretto;
  onPress: (appello: AppelloLibretto) => void;
}) {
  return (
    <Pressable style={styles.panel} onPress={() => onPress(item)}>
      <WhiteView style={styles.iconContainer}>
        <FontAwesome6 name="school" size={32} color="#356EFD" />
      </WhiteView>
      <WhiteView style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {item.adDes}
        </Text>

        <WhiteView style={styles.rowWithIconContainer}>
          <MaterialCommunityIcons
            name="format-align-left"
            size={24}
            color="#356EFD"
          />
          <Text numberOfLines={1} style={styles.cardSubTitle}>
            {item.desApp}
          </Text>
        </WhiteView>
        <WhiteView style={styles.rowWithIconContainer}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={24}
            color="#356EFD"
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
            }}
          >
            {format(
              parse(item.dataInizioApp, "dd/MM/yyyy HH:mm:ss", new Date()),
              "dd/MM/yyyy"
            )}
          </Text>
        </WhiteView>
      </WhiteView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 4,
    flexDirection: "row",
    height: 100,
    verticalAlign: "middle",
    alignContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#EBF1FE",
    width: 76,
    height: 76,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    marginHorizontal: 8,
    flex: 1,
  },
  pressable: {
    marginVertical: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardSubTitle: {
    fontSize: 14,
  },
  rowWithIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
});
