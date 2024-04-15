import { Text, WhiteView } from "@/src/components/Themed";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

export default function ProgressCard({
  cardTitle,
  cardValue,
  progressValue,
  leftProgressText,
  rightProgressText,
}: ProgressCardProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setValue(progressValue), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <WhiteView style={styles.card}>
      <Text style={styles.cardTitle}>{cardTitle}</Text>
      <WhiteView style={styles.cardContent}>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>{cardValue}</Text>
        <WhiteView style={styles.progressContainer}>
          <WhiteView
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Progress.Bar
              progress={value}
              width={null}
              style={styles.progressBar}
            />
          </WhiteView>
          <WhiteView style={styles.progressTextContainer}>
            <Text style={styles.progressText}>{leftProgressText}</Text>
            <Text style={styles.progressText}>{rightProgressText}</Text>
          </WhiteView>
        </WhiteView>
      </WhiteView>
    </WhiteView>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    marginHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 16,
    height: 80,
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
  progressTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 8,
  },
  progressText: { fontSize: 12 },
  progressBar: {
    flex: 3,
    height: 8,
    alignContent: "center",
    alignSelf: "center",
    marginRight: 8,
  },
});

interface ProgressCardProps {
  cardTitle: string;
  cardValue: string;
  progressValue: number;
  leftProgressText: string | number;
  rightProgressText: string | number;
}
