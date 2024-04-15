import { Text, View, WhiteView } from "@/src/components/Themed";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CardButton({
  title,
  materialIcon,
  pressableProps,
  pressableStyle,
}: {
  title: string;
  materialIcon: keyof typeof MaterialIcons.glyphMap;
  pressableProps: PressableProps;
  pressableStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable style={[styles.button, pressableStyle]} {...pressableProps}>
      <WhiteView>
        <View style={styles.imageContainer}>
          <MaterialIcons name={materialIcon} size={32} color="#356EFD" />
        </View>
      </WhiteView>
      <Text style={styles.title}>{title}</Text>
      <MaterialIcons
        name="arrow-forward-ios"
        size={22}
        color="#356EFD"
        style={styles.arrowIcon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginVertical: 8,
  },
  imageContainer: {
    backgroundColor: "#EBF1FE",
    width: 76,
    height: 76,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  arrowIcon: {
    position: "absolute",
    right: 0,
    paddingTop: 4,
  },
});
