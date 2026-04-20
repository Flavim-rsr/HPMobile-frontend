import { Text, TextProps, StyleSheet } from "react-native";
import { colors, typography } from "@/theme";

type AppTextVariant = "title" | "heading" | "subtitle" | "body" | "label" | "button";

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  color?: string;
  center?: boolean;
};

export function AppText({
  variant = "body",
  color = colors.darkBlue,
  center = false,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        typography[variant],
        { color, textAlign: center ? "center" : "left" },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0,
  },
});
