import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppHeader } from "@/components/AppHeader";
import { AppInput } from "@/components/AppInput";
import { AppScreen } from "@/components/AppScreen";
import { AppText } from "@/components/AppText";
import { routes } from "@/constants/routes";
import { colors, spacing } from "@/theme";

const logoImage = require("../assets/images/logo.png");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <AppScreen style={styles.screen}>
      <AppHeader showBack plainBack onBackPress={() => router.replace(routes.welcome)} />
      <View style={styles.headerCopy}>
        <Image source={logoImage} resizeMode="contain" style={styles.logo} />
        <Text style={styles.title}>
          Entrar no <Text style={styles.titleHelp}>Help</Text>
          <Text style={styles.titleTap}>Tap</Text>
        </Text>
        <AppText variant="body" color={colors.textMuted} center>
          Acesse sua conta para gerenciar seus dados
        </AppText>
      </View>

      <View style={styles.form}>
        <AppInput
          label="E-mail"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="mail-outline"
        />
        <AppInput
          label="Senha"
          placeholder="*****"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          leftIcon="lock-closed-outline"
          rightIcon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={() => setIsPasswordVisible((current) => !current)}
        />
      </View>

      <View style={styles.actions}>
        <AppButton
          title="Entrar"
          onPress={() => router.replace(routes.mainMenu)}
          style={styles.primaryButton}
        />
        <Pressable onPress={() => router.push(routes.registerStepOne)} style={styles.link}>
          <AppText variant="body" color={colors.textMuted} center>
            Ainda não tem conta?{" "}
            <AppText variant="button" color={colors.primary}>
              Cadastre-se
            </AppText>
          </AppText>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: spacing.xs,
  },
  headerCopy: {
    alignItems: "center",
    gap: spacing.xs,
    marginTop: 104,
    marginBottom: 42,
  },
  logo: {
    width: 76,
    height: 76,
    marginBottom: spacing.sm,
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
  form: {
    gap: 20,
  },
  actions: {
    gap: spacing.md,
    marginTop: 28,
  },
  primaryButton: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },
  link: {
    paddingVertical: spacing.xs,
  },
});
