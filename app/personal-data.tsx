import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppHeader } from "@/components/AppHeader";
import { AppInput } from "@/components/AppInput";
import { AppScreen } from "@/components/AppScreen";
import { AppText } from "@/components/AppText";
import { routes } from "@/constants/routes";
import { colors, radius, spacing } from "@/theme";
import { formatBirthDate, formatPhone } from "@/utils/userInput";

export default function PersonalDataScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  return (
    <AppScreen>
      <AppHeader showBack plainBack onBackPress={() => router.replace(routes.mainMenu)} />
      <View style={styles.headerCopy}>
        <View style={styles.iconBadge}>
          <Ionicons name="person-outline" size={30} color={colors.primary} />
        </View>
        <AppText variant="heading" center>
          Dados Pessoais
        </AppText>
        <AppText variant="body" color={colors.textMuted} center>
          Edite seus dados básicos e endereço
        </AppText>
      </View>

      <View style={styles.avatar}>
        <Ionicons name="person" size={36} color={colors.primary} />
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
        <AppInput
          label="Telefone"
          placeholder="00 00000-0000"
          value={phone}
          onChangeText={(value) => setPhone(formatPhone(value))}
          keyboardType="number-pad"
          maxLength={13}
        />
        <AppInput
          label="Data de nascimento"
          placeholder="DD/MM/AAAA"
          value={birthDate}
          onChangeText={(value) => setBirthDate(formatBirthDate(value))}
          keyboardType="number-pad"
          maxLength={10}
        />
        <AppInput label="CEP" placeholder="00000-000" value={zipCode} onChangeText={setZipCode} keyboardType="number-pad" />
        <AppInput label="Endereço" placeholder="Rua, avenida ou travessa" value={street} onChangeText={setStreet} />
        <AppInput label="Número" placeholder="123" value={number} onChangeText={setNumber} keyboardType="number-pad" />
        <AppInput label="Complemento" placeholder="Apartamento, bloco, referência" value={complement} onChangeText={setComplement} />
        <AppInput label="Bairro" placeholder="Digite o bairro" value={district} onChangeText={setDistrict} />
        <AppInput label="Cidade" placeholder="Digite a cidade" value={city} onChangeText={setCity} />
        <AppInput label="Estado" placeholder="UF" value={state} onChangeText={setState} autoCapitalize="characters" maxLength={2} />
      </View>

      <AppButton title="Salvar alterações" onPress={() => router.replace(routes.mainMenu)} style={styles.button} />
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
  iconBadge: {
    width: 58,
    height: 58,
    borderRadius: radius.lg,
    backgroundColor: colors.surface3,
    alignItems: "center",
    justifyContent: "center",
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
