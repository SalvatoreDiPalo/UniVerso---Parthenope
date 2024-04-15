import { Text, View, WhiteView } from "@/src/components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TaxWrapper } from "@/src/data/TaxWrapper";
import { RootStackParamList } from "@/src/navigation/RootStackParamList";
import { NavigationProp } from "@react-navigation/native";

export default function TaxItem({
  item,
  navigation,
}: {
  item: TaxWrapper;
  navigation: NavigationProp<RootStackParamList>;
}) {
  const totalTaxes = item.taxes
    .reduce((a, { importoVoce }) => a + importoVoce, 0)
    .toFixed(2);

  return (
    <Pressable
      style={styles.panel}
      onPress={() => navigation.navigate("TasseAnnuali", { item: item })}
    >
      <View style={styles.iconContainer}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#356EFD" }}>
          {item.aaId}
        </Text>
      </View>
      <WhiteView style={styles.contentContainer}>
        <Text numberOfLines={2} style={styles.cardTitle}>
          {`Iscr. ${item.numTratto}° Anno [${item.staStuDes}]`}
        </Text>
        <WhiteView style={styles.rowWithIconContainer}>
          <MaterialCommunityIcons
            name="format-align-left"
            size={24}
            color="#356EFD"
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
            }}
          >
            {item.cdsDes}
          </Text>
        </WhiteView>
        <WhiteView style={styles.rowWithIconContainer}>
          <MaterialCommunityIcons
            name="hand-coin-outline"
            size={24}
            color="#356EFD"
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
            }}
          >
            {totalTaxes} €
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
