import { StyleSheet } from "react-native";
import { AppText } from "@/components/AppText";
import { colors, spacing } from "@/theme";

export function AppFooter() {
  return (
    <AppText variant="body" color={colors.textMuted2} center style={styles.footer}>
      © 2026 HelpTap - Proteção em Emergências
    </AppText>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: spacing.lg,
    fontSize: 11,
  },
});
