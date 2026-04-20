import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppHeader } from "@/components/AppHeader";
import { AppIconBadge } from "@/components/AppIconBadge";
import { AppInput } from "@/components/AppInput";
import { AppScreen } from "@/components/AppScreen";
import { AppSelect } from "@/components/AppSelect";
import { AppText } from "@/components/AppText";
import { routes } from "@/constants/routes";
import { colors, spacing } from "@/theme";

const relationshipOptions = [
  { label: "Mãe", value: "mae" },
  { label: "Pai", value: "pai" },
  { label: "Cônjuge", value: "conjuge" },
  { label: "Irmão/Irmã", value: "irmao" },
  { label: "Filho/Filha", value: "filho" },
  { label: "Amigo(a)", value: "amigo" },
  { label: "Outro", value: "outro" },
];

export default function EmergencyContactScreen() {
  const [contactName, setContactName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phone, setPhone] = useState("");
  const [alternateContactName, setAlternateContactName] = useState("");
  const [alternateRelationship, setAlternateRelationship] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");

  return (
    <AppScreen>
      <AppHeader showBack plainBack onBackPress={() => router.replace(routes.mainMenu)} />
      <View style={styles.headerCopy}>
        <AppIconBadge name="call-outline" />
        <AppText variant="heading" center>
          Contato de Emergência
        </AppText>
        <AppText variant="body" color={colors.textMuted} center>
          Cadastre visualmente uma pessoa de confiança para contato.
        </AppText>
      </View>

      <View style={styles.form}>
        <AppInput label="Nome do contato" placeholder="Digite o nome completo" value={contactName} onChangeText={setContactName} />
        <AppSelect
          label="Parentesco"
          placeholder="Selecione o parentesco"
          value={relationship}
          options={relationshipOptions}
          onChange={setRelationship}
        />
        <AppInput label="Telefone" placeholder="(00) 00000-0000" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <AppInput label="Nome do contato alternativo" placeholder="Digite o nome completo" value={alternateContactName} onChangeText={setAlternateContactName} />
        <AppSelect
          label="Parentesco alternativo"
          placeholder="Selecione o parentesco"
          value={alternateRelationship}
          options={relationshipOptions}
          onChange={setAlternateRelationship}
        />
        <AppInput label="Telefone alternativo" placeholder="(00) 00000-0000" value={alternatePhone} onChangeText={setAlternatePhone} keyboardType="phone-pad" />
      </View>

      <AppButton title="Salvar contato" onPress={() => router.replace(routes.mainMenu)} style={styles.button} />
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
