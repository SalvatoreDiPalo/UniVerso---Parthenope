import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import * as Progress from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  title: string;
  image: keyof typeof MaterialCommunityIcons.glyphMap;
  contentText: string;
  progress: number;
  progressText: string;
  onPress: () => void;
};

export default function PressableProgressCard({
  title,
  image,
  contentText,
  progress,
  progressText,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>
        <View style={styles.cardImage}>
          <MaterialCommunityIcons name={image} size={28} color="#356EFD" />
        </View>
        <View style={styles.progressContainer}>
          <Text>{contentText}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Progress.Bar
              progress={progress}
              width={null}
              style={styles.progressBar}
            />
            <Text>{progressText}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 16,
    height: 92,
    backgroundColor: "#fff",
    elevation: 4,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
    columnGap: 8,
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
    backgroundColor: "#EBF1FE",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    textAlign: "center",
    verticalAlign: "middle",
  },
  progressBar: {
    flex: 3,
    height: 8,
    alignContent: "center",
    alignSelf: "center",
    marginRight: 8,
  },
});
