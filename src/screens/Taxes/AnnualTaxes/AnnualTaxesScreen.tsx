import { AnnualTaxesProps } from "@/src/navigation/RootStackParamList";
import { View, Text, WhiteView } from "@/src/components/Themed";
import { AddebitoStudente } from "@/src/data/remote/AddebitoStudente";
import { useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import InstalmentItem from "./components/InstalmentItem";
import * as Progress from "react-native-progress";

export default function AnnualTaxesScreen({
  route,
  navigation,
}: AnnualTaxesProps) {
  const { item } = route.params;
  const data = item.taxes.filter((instalment) => instalment.annullataFlg === 0);

  let toPay = 0;
  let paid = 0;
  let generalCost = 0;

  data.forEach((tax) => {
    if (tax.fattId !== 0 && tax.pagatoFlg === 0) {
      toPay += tax.importoVoce;
    } else if (tax.pagatoFlg === 1) {
      paid += tax.importoVoce;
    }
    generalCost += tax.importoVoce;
  });

  const taxPercentage = ((paid / generalCost) * 100).toFixed(2);

  const renderItem = useCallback(({ item }: { item: AddebitoStudente }) => {
    return <InstalmentItem item={item} />;
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{toPay.toFixed(2)} €</Text>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}>
          Da pagare
        </Text>
        <Text style={{ textAlign: "center", fontSize: 14, color: "grey" }}>
          Basata sulle fatture emesse
        </Text>
        <WhiteView
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 12,
            justifyContent: "center",
            marginTop: 16,
            height: 75,
            elevation: 4,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Avanzamento pagamenti
          </Text>
          <WhiteView style={styles.cardContent}>
            <WhiteView style={styles.progressContainer}>
              <WhiteView
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Progress.Bar
                  progress={paid / generalCost}
                  width={null}
                  style={styles.progressBar}
                />
                <Text>{taxPercentage}%</Text>
              </WhiteView>
            </WhiteView>
          </WhiteView>
        </WhiteView>
      </View>

      <WhiteView
        style={{
          borderTopRightRadius: 28,
          borderTopLeftRadius: 28,
          paddingTop: 2,
          elevation: 8,
          flex: 1,
        }}
      >
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 16,
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36,
          }}
          data={data}
          renderItem={renderItem}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
        />
      </WhiteView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 16,
    height: 200,
  },
  cardTitle: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
  },
  progressContainer: {
    paddingHorizontal: 4,
    rowGap: 8,
    justifyContent: "center",
    width: "80%",
    flex: 1,
  },
  cardImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  progressBar: {
    flex: 3,
    height: 8,
    alignContent: "center",
    alignSelf: "center",
    marginRight: 8,
  },
});
