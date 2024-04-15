import { Text, View, WhiteView } from "@/src/components/Themed";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ExtendsIscrizioneAppello } from "@/src/data/ExtendsIscrizioneAppello";

export default function BookedItem({
  item,
  loadAppelloAndNavigateInto,
}: {
  item: ExtendsIscrizioneAppello;
  loadAppelloAndNavigateInto: (appId: number, adsceId: number) => Promise<void>;
}) {
  return (
    <Pressable
      style={styles.panel}
      onPress={() => loadAppelloAndNavigateInto(item.appId, item.adsceId)}
    >
      <View style={styles.iconContainer}>
        <FontAwesome6 name="school-circle-check" size={32} color="#356EFD" />
      </View>
      <WhiteView style={styles.contentContainer}>
        <Text numberOfLines={2} style={styles.cardTitle}>
          {item.adDes}
        </Text>

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
              parse(item.dataOraTurno!, "dd/MM/yyyy HH:mm:ss", new Date()),
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
    fontSize: 18,
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
