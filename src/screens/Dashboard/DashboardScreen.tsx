import { StyleSheet, Text, View } from "react-native";
import { RootState } from "../../store/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { shallowEqual, useSelector } from "react-redux";
import { UserSchema } from "@/src/data/UserSchema";
import { RigaLibretto } from "@/src/data/remote/RigaLibretto";
import {
  selectCarriedOutExams,
  selectRigheLibretto,
  selectSumExamsWeight,
} from "@/src/store/Selectors";
import Header from "./components/Header";
import PressableProgressCard from "./components/PressableProgressCard";
import Panel from "./components/Panel";
import { RootStackParamList } from "@/src/navigation/RootStackParamList";
import { useMemo } from "react";

export default function DashboardScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const user: UserSchema = useSelector(
    (state: RootState) => state.user.userInfo
  );
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
  const sumExamsWeight = useSelector(selectSumExamsWeight, shallowEqual);
  return (
    <View style={styles.container}>
      <Header firstName={user.firstName!} lastName={user.lastName!} />

      <Panel navigation={navigation} />

      <View style={styles.sectionPanel}>
        <Text style={styles.sectionTitle}>Carriera</Text>

        <PressableProgressCard
          title="Media"
          image="progress-star"
          contentText={`La tua media è ${gradePointAverage}`}
          progress={exams.length / righeLibretto.length}
          progressText={`${exams.length}/${righeLibretto.length}`}
          onPress={() => navigation.navigate("Statistics")}
        />

        <PressableProgressCard
          title="Progressi"
          image="chart-bell-curve-cumulative"
          contentText={`Hai guadagnato ${sumCarriedOutExamsWeight} CFU su ${sumExamsWeight}`}
          progress={sumCarriedOutExamsWeight / sumExamsWeight}
          progressText={`${Math.round(
            (sumCarriedOutExamsWeight / sumExamsWeight) * 100
          )}%`}
          onPress={() => navigation.navigate("Statistics")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionPanel: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});
