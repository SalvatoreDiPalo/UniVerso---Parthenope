import { ExtendsIscrizioneAppello } from "@/src/data/ExtendsIscrizioneAppello";
import { useGetPrenotazioniPerAdsceIdsQuery } from "@/src/service/libretto-api";
import { selectMatId, selectRigheLibretto } from "@/src/store/Selectors";
import { format, parse } from "date-fns";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  LocaleConfig,
} from "react-native-calendars";
import { DayAgenda } from "react-native-calendars/src/types";
import { shallowEqual, useSelector } from "react-redux";

export default function AgendaScreen() {
  const matId = useSelector(selectMatId);

  const righeLibretto = useSelector(selectRigheLibretto, shallowEqual);

  const { data, isLoading } = useGetPrenotazioniPerAdsceIdsQuery({
    matId,
    righeLibretto,
  });

  const agenda = useMemo(() => {
    const items: ExtendsAgendaSchedule = {};
    if (!data) {
      return items;
    }
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const date = parse(
        element.dataOraTurno,
        "dd/MM/yyyy HH:mm:ss",
        new Date()
      );
      const strTime = format(date, "yyyy-MM-dd");

      if (!items[strTime]) {
        items[strTime] = [];
      }
      items[strTime].push({
        name: element.adDes,
        height: 120,
        day: strTime,
        iscrizioneAppello: element,
        formattedDate: date,
      });
    }
    return items;
  }, [data]);

  const renderItem = (
    reservation: ExtendsAgendaEntry,
    isFirst: boolean
  ): React.JSX.Element => {
    const fontSize = isFirst ? 20 : 18;

    return (
      <View
        key={reservation.iscrizioneAppello.applistaId}
        style={[styles.item, { minHeight: reservation.height }]}
      >
        <Text style={{ fontSize, color: "white" }}>{reservation.name}</Text>
        <Text style={{ fontSize: 14, color: "white" }}>
          {format(reservation.formattedDate, "HH:mm")}
        </Text>
      </View>
    );
  };

  const renderEmptyData = (): React.JSX.Element => {
    return (
      <View style={styles.day}>
        <Text allowFontScaling={false} style={[styles.noEvents]}>
          Attualmente non sono presenti eventi
        </Text>
      </View>
    );
  };

  const rowHasChanged = (
    r1: ExtendsAgendaEntry,
    r2: ExtendsAgendaEntry
  ): boolean => {
    return r1.iscrizioneAppello.applistaId !== r2.iscrizioneAppello.applistaId;
  };

  const keyExtractor = (item: ExtendsDayAgenda, index: number): string => {
    return String(item.reservation?.iscrizioneAppello.applistaId ?? index);
  };

  // Wait https://github.com/wix/react-native-calendars/issues/2419 to remove cast to unknown to Extends...
  return (
    <Agenda
      items={agenda}
      renderItem={(reservation: AgendaEntry, isFirst: boolean) =>
        renderItem(reservation as unknown as ExtendsAgendaEntry, isFirst)
      }
      rowHasChanged={(a: AgendaEntry, b: AgendaEntry) =>
        rowHasChanged(
          a as unknown as ExtendsAgendaEntry,
          b as unknown as ExtendsAgendaEntry
        )
      }
      showClosingKnob
      refreshing={isLoading}
      renderEmptyData={() => renderEmptyData()}
      reservationsKeyExtractor={(item: DayAgenda, index: number) =>
        keyExtractor(item as unknown as ExtendsDayAgenda, index)
      }
      theme={
        {
          stylesheet: {
            agenda: {
              main: {
                backgroundColor: "red",
                "background-color": "red",
                background: "red",
              },
            },
          },
          calendarBackground: "#fff",
          reservationsBackgroundColor: "#F6F8F9",
          selectedDayBackgroundColor: "#017BFF",
        } as any
      }
    />
  );
}

LocaleConfig.locales["it"] = {
  monthNames: [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ],
  mesShort: [
    "Gen.",
    "Feb.",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug.",
    "Ago",
    "Set.",
    "Ott.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mer.", "Gio.", "Ven.", "Sab."],
  today: "Oggi",
};

LocaleConfig.defaultLocale = "it";

interface ExtendsAgendaEntry extends AgendaEntry {
  name: string;
  height: number;
  day: string;
  iscrizioneAppello: ExtendsIscrizioneAppello;
  formattedDate: Date;
}
interface ExtendsAgendaSchedule extends AgendaSchedule {
  [date: string]: ExtendsAgendaEntry[];
}

interface ExtendsDayAgenda {
  reservation?: ExtendsAgendaEntry;
  date?: Date;
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#017BFF",
    flex: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    elevation: 4,
  },
  day: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noEvents: {
    fontSize: 20,
    fontWeight: "400",
    paddingHorizontal: 16,
    color: "grey",
  },
});
