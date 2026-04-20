import { router } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppFooter } from "@/components/AppFooter";
import { AppScreen } from "@/components/AppScreen";
import { routes } from "@/constants/routes";
import { colors, spacing } from "@/theme";

const backgroundImage = require("../assets/images/background.png");

export default function WelcomeScreen() {
  return (
    <AppScreen scroll={false} style={styles.screen}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.hero} />

      <View style={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.title}>
            Bem vindo ao <Text style={styles.titleHelp}>Help</Text>
            <Text style={styles.titleTap}>Tap</Text>
          </Text>
        </View>

        <View style={styles.actions}>
          <AppButton
            title="Login"
            variant="secondary"
            onPress={() => router.push(routes.login)}
            style={styles.loginButton}
          />
          <AppButton
            title="Cadastro"
            onPress={() => router.push(routes.registerStepOne)}
            style={styles.primaryButton}
          />
        </View>
      </View>

      <AppFooter />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingBottom: spacing.xs,
  },
  hero: {
    width: "100%",
    height: 206,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: 64,
    paddingBottom: 54,
  },
  brand: {
    alignItems: "center",
  },
  title: {
    color: colors.black,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
    letterSpacing: 0,
  },
  titleHelp: {
    color: colors.primaryLight,
  },
  titleTap: {
    color: colors.darkBlue,
  },
  actions: {
    gap: 17,
  },
  loginButton: {
    borderColor: colors.surface2,
  },
  primaryButton: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },
});
