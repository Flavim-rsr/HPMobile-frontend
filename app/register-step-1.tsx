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
import { registerUser } from "@/services/api";
import { setRegisteredUser } from "@/services/session";
import { colors, radius, spacing } from "@/theme";
import { formatBirthDate, formatCpf, getErrorMessage, onlyDigits, toIsoDate } from "@/utils/userInput";

export default function RegisterStepOneScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    const cleanCpf = onlyDigits(cpf);
    const nextPassword = password.trim();

    if (!fullName.trim() || !email.trim() || !nextPassword || !cleanCpf || !birthDate.trim()) {
      setErrorMessage("Preencha nome, e-mail, senha, CPF e data de nascimento.");
      return;
    }

    try {
      setErrorMessage("");
      setIsLoading(true);
      const user = await registerUser({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: nextPassword,
        cpf: cleanCpf,
        dateBirth: toIsoDate(birthDate),
        identifier: cleanCpf,
        role: "PATIENT",
      });
      setRegisteredUser(user);
      router.replace(routes.mainMenu);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

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
        <AppInput
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <AppInput
          label="Senha"
          placeholder="*****"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon="lock-closed-outline"
          rightIcon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={() => setIsPasswordVisible((current) => !current)}
        />
        <AppInput
          label="CPF"
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={(value) => setCpf(formatCpf(value))}
          keyboardType="number-pad"
          maxLength={14}
        />
        <AppInput
          label="Data de nascimento"
          placeholder="DD/MM/AAAA"
          value={birthDate}
          onChangeText={(value) => setBirthDate(formatBirthDate(value))}
          keyboardType="number-pad"
          maxLength={10}
        />
      </View>

      {errorMessage ? (
        <AppText variant="body" color={colors.error} center>
          {errorMessage}
        </AppText>
      ) : null}

      <AppButton
        title={isLoading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleRegister}
        loading={isLoading}
        style={styles.button}
      />
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
