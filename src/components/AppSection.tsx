import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { colors, spacing } from "@/theme";

type AppSectionProps = {
  title?: string;
  children: ReactNode;
};

export function AppSection({ title, children }: AppSectionProps) {
  return (
    <View style={styles.section}>
      {title ? (
        <AppText variant="label" color={colors.textMuted}>
          {title}
        </AppText>
      ) : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.sm,
  },
  content: {
    gap: spacing.md,
  },
});
