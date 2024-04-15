import { ReactElement } from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { View, Text } from "./Themed";

interface Props {
  index: number;
  value: string;
  onPress?: (index: number) => void;
  chipContainerStyle?: StyleProp<ViewStyle>;
  chipTextStyle?: StyleProp<TextStyle>;
  chipImage?: ReactElement;
}

export const Chip: React.FC<Props> = ({
  chipContainerStyle,
  index,
  onPress,
  chipImage,
  chipTextStyle,
  value,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chipContainer, chipContainerStyle]}
      onPress={() => (onPress ? onPress(index) : "")}
      testID={`ChipContainer_${index}`}
    >
      {chipImage && chipImage}
      <Text testID="content" style={[styles.chipText, chipTextStyle]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {},
  chipImageContainer: {
    marginLeft: 5,
  },
});
