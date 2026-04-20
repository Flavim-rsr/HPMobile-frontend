import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, TextInputProps, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { colors, radius, spacing } from "@/theme";

type AppInputProps = TextInputProps & {
  label: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
};

export function AppInput({
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  placeholderTextColor = colors.textMuted2,
  ...props
}: AppInputProps) {
  return (
    <View style={styles.wrapper}>
      <AppText variant="label" color={colors.textMuted}>
        {label}
      </AppText>
      <View style={styles.inputShell}>
        {leftIcon ? (
          <Ionicons name={leftIcon} size={17} color={colors.textMuted2} style={styles.leftIcon} />
        ) : null}
        <TextInput
          {...props}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, leftIcon && styles.inputWithLeftIcon, rightIcon && styles.inputWithRightIcon, style]}
        />
        {rightIcon ? (
          <Pressable
            accessibilityRole={onRightIconPress ? "button" : undefined}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={styles.rightIconButton}
          >
            <Ionicons name={rightIcon} size={17} color={colors.textMuted2} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  inputShell: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    minHeight: 52,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.darkBlue,
  },
  inputWithLeftIcon: {
    paddingLeft: 48,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  leftIcon: {
    position: "absolute",
    left: spacing.md,
    top: 18,
    zIndex: 1,
  },
  rightIconButton: {
    position: "absolute",
    right: spacing.md,
    top: 0,
    bottom: 0,
    width: 32,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
