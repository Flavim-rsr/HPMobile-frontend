import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppHeader } from "@/components/AppHeader";
import { AppIconBadge } from "@/components/AppIconBadge";
import { AppInput } from "@/components/AppInput";
import { AppScreen } from "@/components/AppScreen";
import { AppText } from "@/components/AppText";
import { routes } from "@/constants/routes";
import { colors, radius, spacing } from "@/theme";

export default function RegisterStepOneScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");

  return (
    <AppScreen>
      <AppHeader showBack plainBack />
      <View style={styles.headerCopy}>
        <AppIconBadge name="person" />
        <AppText variant="heading" center>
          Informações Pessoais
        </AppText>
        <AppText variant="body" color={colors.textMuted} center>
          Dados básicos para sua identificação
        </AppText>
      </View>

      <View style={styles.avatar}>
        <Ionicons name="camera" size={30} color={colors.primary} />
      </View>

      <View style={styles.form}>
        <AppInput label="Nome completo" placeholder="Digite seu nome" value={fullName} onChangeText={setFullName} />
        <AppInput label="E-mail" placeholder="seuemail@exemplo.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
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
        <AppInput label="CPF" placeholder="000.000.000-00" value={cpf} onChangeText={setCpf} keyboardType="number-pad" />
        <AppInput label="Data de nascimento" placeholder="DD/MM/AAAA" value={birthDate} onChangeText={setBirthDate} keyboardType="number-pad" />
      </View>

      <AppButton title="Continuar" onPress={() => router.push(routes.registerStepTwo)} style={styles.button} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  headerCopy: {
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.md,
  },
  button: {
    marginTop: spacing.xl,
  },
});
