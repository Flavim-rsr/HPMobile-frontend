import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { colors, radius, spacing } from "@/theme";

type AppHeaderProps = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  plainBack?: boolean;
};

export function AppHeader({ title, showBack = false, onBackPress, plainBack = false }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          onPress={onBackPress ?? router.back}
          style={({ pressed }) => [
            styles.backButton,
            plainBack && styles.plainBackButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="chevron-back" size={24} color={colors.darkBlue} />
        </Pressable>
      ) : (
        <View style={styles.backSpacer} />
      )}
      {title ? (
        <AppText variant="label" color={colors.darkBlue} center style={styles.title}>
          {title}
        </AppText>
      ) : (
        <View style={styles.title} />
      )}
      <View style={styles.backSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  plainBackButton: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  backSpacer: {
    width: 42,
  },
  title: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
