import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { colors, radius } from "@/theme";

type AppIconBadgeProps = {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  backgroundColor?: string;
};

export function AppIconBadge({
  name,
  size = 26,
  color = colors.primary,
  backgroundColor = colors.surface3,
}: AppIconBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 58,
    height: 58,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
});
