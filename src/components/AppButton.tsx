import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { AppText } from "@/components/AppText";
import { colors, radius, shadows, spacing } from "@/theme";

type AppButtonVariant = "primary" | "secondary" | "ghost";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  style?: ViewStyle;
};

export function AppButton({ title, onPress, variant = "primary", style }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        style,
      ]}
    >
      <AppText
        variant="button"
        color={variant === "primary" ? colors.white : colors.darkBlue}
        center
      >
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.soft,
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  ghost: {
    minHeight: 44,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
});
