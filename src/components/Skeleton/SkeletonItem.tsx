import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { View, WhiteView } from "../Themed";
import { StyleSheet } from "react-native";

export default function SkeletonItem() {
  const colorMode = "light";
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={styles.panel}
    >
      <Skeleton colorMode={colorMode} height={76} width={76} />

      <WhiteView style={styles.contentContainer}>
        <Skeleton colorMode={colorMode} width={"100%"} />
        <Spacer height={8} />

        <Skeleton colorMode={colorMode} width={"100%"} />
      </WhiteView>
    </MotiView>
  );
}

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

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
  contentContainer: {
    marginHorizontal: 8,
    flex: 1,
  },
});
