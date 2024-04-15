import { Text, View, WhiteView } from "@/src/components/Themed";
import { RigaLibretto } from "@/src/data/remote/RigaLibretto";
import {
  selectCarriedOutExams,
  selectStuId,
  selectRigheLibretto,
} from "@/src/store/Selectors";
import { StyleSheet } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import { Constants } from "@/src/constants/Constant";
import { useMemo } from "react";
import { BarChart } from "react-native-gifted-charts";
import ProgressCard from "./components/ProgressCard";
import { useGetIscrAnnQuery } from "@/src/service/carriere-api";

const max = Constants.maxVote;
const maxVoteDegree = Constants.maxVoteDegree;
const minVoteDegree = Constants.minVoteDegree;

export default function StatisticsScreen() {
  const stuId = useSelector(selectStuId);
  const righeLibretto: RigaLibretto[] = useSelector(
    selectRigheLibretto,
    shallowEqual
  );
  const exams: RigaLibretto[] = useSelector(
    selectCarriedOutExams,
    shallowEqual
  );

  const gradePointAverage = useMemo(() => {
    const sum = exams.reduce(
      (a: number, b: RigaLibretto) => a + (b.esito.voto ?? 0),
      0
    );
    return sum / exams.length || 0;
  }, []);
  const sumCarriedOutExamsWeight = useMemo(
    () => exams.reduce((a: number, b: RigaLibretto) => a + (b.peso ?? 0), 0),
    []
  );

  const careerAdvancement = (exams.length / righeLibretto.length) * 100;
  const degree = (gradePointAverage * maxVoteDegree) / max;

  const { data } = useGetIscrAnnQuery(stuId);

  const votesChart = useMemo(() => {
    return calcolaLabelEVoti(righeLibretto);
  }, []);

  return (
    <View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 64,
            fontWeight: "700",
          }}
        >
          {gradePointAverage.toFixed(2)}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          la tua media
        </Text>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          {`basata su ${exams.length} esami superati`}
        </Text>
      </View>

      <ProgressCard
        cardTitle="Avanzamento carriera"
        cardValue={`${careerAdvancement.toFixed(0)}%`}
        progressValue={exams.length / righeLibretto.length}
        leftProgressText={`${sumCarriedOutExamsWeight} CFU ricavati`}
        rightProgressText={data && data.length > 0 ? data[0].valoreMin : 180}
      />

      <ProgressCard
        cardTitle="Base laurea"
        cardValue={degree.toFixed(2)}
        progressValue={degree / maxVoteDegree}
        leftProgressText={minVoteDegree}
        rightProgressText={maxVoteDegree}
      />

      <WhiteView
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 12,
          marginHorizontal: 16,
          marginTop: 16,
          elevation: 4,
          overflow: "hidden",
        }}
      >
        <Text style={styles.cardTitle}>Voti ottenuti</Text>
        <BarChart
          data={votesChart}
          showGradient
          gradientColor={"#356EFD"}
          yAxisThickness={0}
          xAxisThickness={1}
          xAxisColor={"#00ADFF"}
          frontColor={"transparent"}
          sideColor={"#00D9F5"}
          topColor={"#6BFBCE"}
          barStyle={{
            borderColor: "#6BFBCE",
            shadowColor: "#6BFBCE",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 8,
          }}
          barWidth={10}
          isAnimated
          noOfSections={6}
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
    height: 100,
    backgroundColor: "#fff",
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
  },
  progressContainer: {
    paddingHorizontal: 4,
    paddingLeft: 16,
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

function calcolaLabelEVoti(
  rows: RigaLibretto[]
): { value: number; label: string }[] {
  const labelCounts: Record<string, number> = {};
  // Conta il numero di volte in cui ciascun voto corrisponde a una label
  for (const item of rows) {
    const voto = item.esito.voto;
    const lode = item.esito.lodeFlg === 1;

    if (voto && voto >= 18 && voto <= 30) {
      const label = lode ? "30L" : voto.toString();
      labelCounts[label] = (labelCounts[label] || 0) + 1;
    }
  }

  // Crea l'array risultante con i campi value e label
  const risultatoArray: { value: number; label: string }[] = [];
  for (let voto = 18; voto <= 31; voto++) {
    const label = voto === 31 ? "30L" : voto.toString();
    risultatoArray.push({ value: labelCounts[label] || 0, label });
  }

  return risultatoArray;
}
