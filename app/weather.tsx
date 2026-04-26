import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import { AppHeader } from "@/components/AppHeader";
import { AppScreen } from "@/components/AppScreen";
import { AppText } from "@/components/AppText";
import { routes } from "@/constants/routes";
import { getWeather, type WeatherResponse } from "@/services/api";
import { colors, radius, spacing } from "@/theme";
import { getErrorMessage } from "@/utils/userInput";

export default function WeatherScreen() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadWeather() {
    try {
      setErrorMessage("");
      setIsLoading(true);
      const data = await getWeather();
      setWeather(data);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadWeather();
  }, []);

  const current = weather?.current_weather;

  return (
    <AppScreen>
      <AppHeader showBack plainBack onBackPress={() => router.replace(routes.mainMenu)} />

      <View style={styles.headerCopy}>
        <View style={styles.iconBadge}>
          <Ionicons name="partly-sunny-outline" size={32} color={colors.primary} />
        </View>
        <AppText variant="heading" center>
          Clima
        </AppText>
        <AppText variant="body" color={colors.textMuted} center>
          Informações atuais para São Paulo
        </AppText>
      </View>

      {isLoading && !weather ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} size="large" />
          <AppText variant="body" color={colors.textMuted} center>
            Carregando clima...
          </AppText>
        </View>
      ) : null}

      {errorMessage ? (
        <AppCard style={styles.errorCard}>
          <AppText variant="body" color={colors.error} center>
            {errorMessage}
          </AppText>
        </AppCard>
      ) : null}

      {current ? (
        <View style={styles.content}>
          <AppCard style={styles.temperatureCard}>
            <AppText variant="body" color={colors.textMuted} center>
              Temperatura atual
            </AppText>
            <AppText variant="title" color={colors.darkBlue} center style={styles.temperature}>
              {current.temperature.toFixed(1)}°C
            </AppText>
            <AppText variant="body" color={colors.textMuted} center>
              {current.is_day ? "Dia" : "Noite"} • Código {current.weathercode}
            </AppText>
          </AppCard>

          <View style={styles.grid}>
            <WeatherInfo label="Velocidade do vento" value={`${current.windspeed.toFixed(1)} km/h`} icon="speedometer-outline" />
            <WeatherInfo label="Direção do vento" value={`${current.winddirection}°`} icon="compass-outline" />
            <WeatherInfo label="Horário da medição" value={formatWeatherTime(current.time)} icon="time-outline" />
            <WeatherInfo label="Coordenadas" value={`${weather.latitude.toFixed(4)}, ${weather.longitude.toFixed(4)}`} icon="location-outline" />
          </View>
        </View>
      ) : null}

      <AppButton
        title={isLoading ? "Atualizando..." : "Atualizar"}
        onPress={loadWeather}
        loading={isLoading}
        style={styles.button}
      />
    </AppScreen>
  );
}

type WeatherInfoProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
};

function WeatherInfo({ label, value, icon }: WeatherInfoProps) {
  return (
    <AppCard style={styles.infoCard}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <View style={styles.infoCopy}>
        <AppText variant="body" color={colors.textMuted}>
          {label}
        </AppText>
        <AppText variant="button" color={colors.darkBlue}>
          {value}
        </AppText>
      </View>
    </AppCard>
  );
}

function formatWeatherTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const styles = StyleSheet.create({
  headerCopy: {
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: colors.surface3,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  errorCard: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  content: {
    gap: spacing.md,
  },
  temperatureCard: {
    alignItems: "center",
    gap: spacing.xs,
  },
  temperature: {
    fontSize: 44,
    lineHeight: 54,
  },
  grid: {
    gap: spacing.md,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  infoCopy: {
    flex: 1,
    gap: spacing.xxs,
  },
  button: {
    marginTop: spacing.xl,
  },
});
