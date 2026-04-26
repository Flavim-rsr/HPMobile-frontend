import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppHeader } from "@/components/AppHeader";
import { AppIconBadge } from "@/components/AppIconBadge";
import { AppScreen } from "@/components/AppScreen";
import { AppText } from "@/components/AppText";
import { routes } from "@/constants/routes";
import { colors, spacing } from "@/theme";

export default function RegisterStepTwoScreen() {
  return (
    <AppScreen>
      <AppHeader showBack plainBack onBackPress={() => router.replace(routes.registerStepOne)} />
      <View style={styles.headerCopy}>
        <AppIconBadge name="location" />
        <AppText variant="heading" center>
          Localização
        </AppText>
        <AppText variant="body" color={colors.textMuted} center>
          Esta etapa foi desativada porque o cadastro atual nao envia endereco.
        </AppText>
      </View>

      <AppButton
        title="Voltar ao cadastro"
        onPress={() => router.replace(routes.registerStepOne)}
        style={styles.button}
      />

      {/*
        Campos de localizacao preservados para uso futuro, caso o backend passe a aceitar endereco:

        const [zipCode, setZipCode] = useState("");
        const [street, setStreet] = useState("");
        const [number, setNumber] = useState("");
        const [complement, setComplement] = useState("");
        const [district, setDistrict] = useState("");
        const [city, setCity] = useState("");
        const [state, setState] = useState("");

        <View style={styles.form}>
          <AppInput label="CEP" placeholder="00000-000" value={zipCode} onChangeText={setZipCode} keyboardType="number-pad" />
          <AppInput label="Endereco" placeholder="Rua, avenida ou travessa" value={street} onChangeText={setStreet} />
          <AppInput label="Numero" placeholder="123" value={number} onChangeText={setNumber} keyboardType="number-pad" />
          <AppInput label="Complemento" placeholder="Apartamento, bloco, referencia" value={complement} onChangeText={setComplement} />
          <AppInput label="Bairro" placeholder="Digite o bairro" value={district} onChangeText={setDistrict} />
          <AppInput label="Cidade" placeholder="Digite a cidade" value={city} onChangeText={setCity} />
          <AppInput label="Estado" placeholder="UF" value={state} onChangeText={setState} autoCapitalize="characters" maxLength={2} />
        </View>
      */}
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
  button: {
    marginTop: spacing.xl,
  },
});
