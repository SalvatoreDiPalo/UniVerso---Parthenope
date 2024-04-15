import { Text, WhiteView } from "@/src/components/Themed";
import { format, parse } from "date-fns";
import { it } from "date-fns/locale";
import Description from "./Description";
import { TipoEsaEnum } from "@/src/data/remote/enum/TipoEsaEnum";
import { AppelloLibretto } from "@/src/data/remote/AppelloLibretto";
import { ScrollView } from "react-native-gesture-handler";
import { Chip } from "@/src/components/Chip";

export default function ExamDetailScreen({ item }: { item: AppelloLibretto }) {
  const formattedStartDate = format(
    parse(item.dataInizioApp!, "dd/MM/yyyy HH:mm:ss", new Date()),
    "dd MMM yyyy",
    { locale: it }
  );
  const formattedStartTime = format(
    parse(item.oraEsa!, "dd/MM/yyyy HH:mm:ss", new Date()),
    "HH:mm",
    { locale: it }
  );

  let formattedReservations;
  if (item.dataInizioIscr && item.dataFineIscr) {
    const startDate = format(
      parse(item.dataInizioIscr!, "dd/MM/yyyy HH:mm:ss", new Date()),
      "dd/MM/yyyy"
    );

    const endDate = format(
      parse(item.dataFineIscr!, "dd/MM/yyyy HH:mm:ss", new Date()),
      "dd/MM/yyyy"
    );
    formattedReservations = `${startDate} - ${endDate}`;
  }

  return (
    <ScrollView style={{ paddingHorizontal: 16, height: "100%" }} overScrollMode="never">
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
        }}
        numberOfLines={3}
      >
        {item.adDes?.trim()}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "grey",
          textTransform: "capitalize",
        }}
      >
        {formattedStartDate} {formattedStartTime}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 8,
        }}
        numberOfLines={3}
      >
        {formattedReservations}
      </Text>

      <WhiteView
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <WhiteView style={{ flexDirection: "row" }}>
          <Chip
            index={1}
            value={`${item.presidenteCognome} ${item.presidenteNome}`.toLowerCase()}
            key={"presidente"}
            chipContainerStyle={{
              minWidth: 100,
              maxWidth: 170,
              backgroundColor: "#EBF1FE",
            }}
            chipTextStyle={{
              color: "#356EFD",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          />
          {item.tipoEsaCod?.value && (
            <Chip
              index={2}
              value={
                TipoEsaEnum[item.tipoEsaCod?.value as keyof typeof TipoEsaEnum]
              }
              key={"tipoEsa"}
              chipContainerStyle={{
                minWidth: 100,
                maxWidth: 170,
                backgroundColor: "#EBF1FE",
              }}
              chipTextStyle={{ color: "#356EFD", fontWeight: "bold" }}
            />
          )}
        </WhiteView>
        <Text
          style={{
            fontSize: 18,
            color: "grey",
            alignSelf: "center",
          }}
        >
          Iscritti: {item.numIscritti}
        </Text>
      </WhiteView>

      {item.desApp && (
        <Description
          title="Descrizione"
          description={item.desApp}
          icon="note-text-outline"
        />
      )}

      {item.note && (
        <Description
          title="Note"
          description={item.note}
          icon="note-text-outline"
        />
      )}
    </ScrollView>
  );
}
