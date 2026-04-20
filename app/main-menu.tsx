import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { AppScreen } from "@/components/AppScreen";
import { AppText } from "@/components/AppText";
import { MenuCard } from "@/components/MenuCard";
import { routes } from "@/constants/routes";
import { colors, radius, spacing } from "@/theme";

const logoImage = require("../assets/images/logo.png");

export default function MainMenuScreen() {
  return (
    <AppScreen scroll={false}>
      <View style={styles.topArea}>
        <View style={styles.greeting}>
          <Image source={logoImage} resizeMode="contain" style={styles.logo} />
          <View style={styles.greetingCopy}>
            <AppText variant="body" color={colors.black}>
              Olá,
            </AppText>
            <AppText variant="label" color={colors.black}>
              Rafael Andrade
            </AppText>
          </View>
        </View>

        <View style={styles.userAvatar}>
          <Ionicons name="person-outline" size={34} color={colors.primary} />
        </View>
      </View>

      <View style={styles.menu}>
        <AppText variant="label" color={colors.textMuted}>
          ACESSOS
        </AppText>
        <MenuCard
          title="Dados Pessoais"
          subtitle="Editar dados e endereço"
          icon="person-outline"
          onPress={() => router.push(routes.personalData)}
        />
        <MenuCard
          title="Contato de Emergência"
          subtitle="Telefones e vínculo do contato"
          icon="call-outline"
          onPress={() => router.push(routes.emergencyContact)}
        />
        <MenuCard
          title="Sair"
          subtitle="Voltar para a tela inicial"
          icon="log-out-outline"
          onPress={() => router.replace(routes.welcome)}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  topArea: {
    marginTop: spacing.sm,
    alignItems: "center",
    gap: spacing.xl,
  },
  greeting: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  logo: {
    width: 46,
    height: 46,
  },
  greetingCopy: {
    flex: 1,
  },
  userAvatar: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.surface3,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    marginTop: 44,
    gap: spacing.md,
  },
});
