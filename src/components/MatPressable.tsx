import { Pressable, PressableProps, StyleSheet } from "react-native";
import { useThemeProperty } from "./Themed";

export function MatPressable({
  style,
  children,
  disabled,
  ...otherProps
}: PressableProps) {
  const buttonBackgroundColor = useThemeProperty("buttonBackgroundColor");
  const bordercolor = useThemeProperty("buttonBorderColor");

  return (
    <Pressable
      style={{
        ...innerStyles.pressable,
        backgroundColor: buttonBackgroundColor,
        borderColor: bordercolor,
        opacity: disabled ? 0.5 : 1,
      }}
      {...otherProps}
    >
      {children}
    </Pressable>
  );
}

const innerStyles = StyleSheet.create({
  pressable: {
    minWidth: 64,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    textTransform: "uppercase",
    marginHorizontal: 12,
  },
});
