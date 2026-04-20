import { Platform } from "react-native";

export const shadows = {
  soft: Platform.select({
    ios: {
      shadowColor: "#13316C",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 18,
    },
    android: {
      elevation: 3,
    },
    default: {},
  }),
};
