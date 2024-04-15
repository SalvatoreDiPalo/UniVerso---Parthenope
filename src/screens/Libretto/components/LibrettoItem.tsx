import { Text, View, WhiteView } from "@/src/components/Themed";
import { RigaLibretto } from "@/src/data/remote/RigaLibretto";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";

export default function LibrettoItem({ item }: { item: RigaLibretto }) {
  let descrizione = item.adDes;
  let cfu = "0";
  if (descrizione.lastIndexOf("CFU") >= 0) {
    const indexOfCfu = item.adDes.lastIndexOf("CFU");
    descrizione = descrizione.substring(0, indexOfCfu);
    cfu = item.adDes.substring(indexOfCfu + 3, item.adDes.length);
  }

  return (
    <WhiteView style={styles.panel}>
      <View style={styles.iconContainer}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#356EFD" }}>
          {item.esito.voto}
          {item.esito.lodeFlg === 1 && "L"}
        </Text>
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
              parse(item.esito?.dataEsa!, "dd/MM/yyyy HH:mm:ss", new Date()),
              "dd/MM/yyyy"
            )}
          </Text>
        </WhiteView>
      </WhiteView>
    </WhiteView>
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
