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
import { colors, spacing } from "@/theme";

export default function RegisterStepTwoScreen() {
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  return (
    <AppScreen>
      <AppHeader showBack plainBack />
      <View style={styles.headerCopy}>
        <AppIconBadge name="location" />
        <AppText variant="heading" center>
          Localização
        </AppText>
        <AppText variant="body" color={colors.textMuted} center>
          Informe seu endereço para concluir o cadastro
        </AppText>
      </View>

      <View style={styles.form}>
        <AppInput label="CEP" placeholder="00000-000" value={zipCode} onChangeText={setZipCode} keyboardType="number-pad" />
        <AppInput label="Endereço" placeholder="Rua, avenida ou travessa" value={street} onChangeText={setStreet} />
        <AppInput label="Número" placeholder="123" value={number} onChangeText={setNumber} keyboardType="number-pad" />
        <AppInput label="Complemento" placeholder="Apartamento, bloco, referência" value={complement} onChangeText={setComplement} />
        <AppInput label="Bairro" placeholder="Digite o bairro" value={district} onChangeText={setDistrict} />
        <AppInput label="Cidade" placeholder="Digite a cidade" value={city} onChangeText={setCity} />
        <AppInput label="Estado" placeholder="UF" value={state} onChangeText={setState} autoCapitalize="characters" maxLength={2} />
      </View>

      <AppButton title="Cadastrar" onPress={() => router.replace(routes.mainMenu)} style={styles.button} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  headerCopy: {
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.md,
  },
  button: {
    marginTop: spacing.xl,
  },
});
