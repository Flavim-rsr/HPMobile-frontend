import { Stack, type ErrorBoundaryProps } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { colors } from "@/theme";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <SafeAreaProvider>
      <View style={styles.errorScreen}>
        <AppText variant="heading" color={colors.error} center>
          Algo deu errado
        </AppText>
        <AppText variant="body" color={colors.textMuted} center>
          {error.message}
        </AppText>
        <AppButton title="Tentar novamente" onPress={retry} />
      </View>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <StatusBar style="dark" backgroundColor={colors.background} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  errorScreen: {
    flex: 1,
    justifyContent: "center",
    gap: 18,
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
});
