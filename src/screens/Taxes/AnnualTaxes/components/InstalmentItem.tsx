import { View, Text, WhiteView } from "@/src/components/Themed";
import { StyleSheet } from "react-native";
import { AddebitoStudente } from "@/src/data/remote/AddebitoStudente";
import { format, parse } from "date-fns";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function InstalmentItem({ item }: { item: AddebitoStudente }) {
  let status: string = "";
  let formattedDate: string = "";
  let icon: keyof typeof MaterialCommunityIcons.glyphMap;
  let color: string;
  //Non disponibile - Non emessa
  if (item.fattId === 0) {
    status = "NON EMESSA";
    icon = "store-clock";
    color = "#FFCB47";
  } else {
    const date = item.pagatoFlg ? item.dataPagamento : item.scadFattura;
    formattedDate = format(
      parse(date, "dd/MM/yyyy HH:mm:ss", new Date()),
      "dd/MM/yyyy"
    );
    status = item.pagatoFlg
      ? "PAGATO"
      : item.scadutoFlg
      ? "SCADUTO"
      : "IN SCADENZA";
    icon = item.pagatoFlg ? "store-check" : "store-alert";
    color = item.pagatoFlg === 1 ? "#009762" : "#DD4000";
  }

  return (
    <WhiteView style={styles.panel}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={32} color="#356EFD" />
      </View>

      <WhiteView style={styles.contentContainer}>
        <WhiteView style={styles.spaceBetween}>
          <Text numberOfLines={1} style={styles.cardTitle}>
            {item.voceId === 2 ? item.tassaDes : `Rata ${item.rataDes}`}
          </Text>
        </WhiteView>
        <WhiteView style={[styles.spaceBetween, { alignItems: "center" }]}>
          <Text style={[styles.status, { color: color }]}>
            {status}
            <Text style={styles.date}>{`${
              item.fattId !== 0 ? " il " : " "
            }${formattedDate}`}</Text>
          </Text>

          <Text style={styles.price}>{item.importoVoce.toFixed(2)} €</Text>
        </WhiteView>

        <WhiteView style={styles.rowWithIconContainer}>
          <Text numberOfLines={1} style={styles.cardSubTitle}>
            Fattura: {item.fattId !== 0 ? item.fattId : ""}
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
    height: 90,
    verticalAlign: "middle",
    alignContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#EBF1FE",
    width: 64,
    height: 64,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    marginHorizontal: 8,
    flex: 1,
  },
  spaceBetween: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 18,
  },
  cardSubTitle: {
    fontSize: 14,
    color: "grey",
  },
  date: {
    fontWeight: "bold",
    fontSize: 14,
  },
  status: {
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rowWithIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
});
