import {
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

export const TEXT_SCALE_OPTIONS = [
  { value: "small", label: "Small", multiplier: 0.95 },
  { value: "medium", label: "Medium", multiplier: 1 },
  { value: "large", label: "Large", multiplier: 1.15 },
];

export function getTextScaleMultiplier(scale) {
  return (
    TEXT_SCALE_OPTIONS.find((option) => option.value === scale)?.multiplier ?? 1
  );
}

export function buildPaperTheme(mode) {
  const baseTheme = mode === "dark" ? MD3DarkTheme : MD3LightTheme;

  return {
    ...baseTheme,
    roundness: 18,
    colors: {
      ...baseTheme.colors,
      primary: "#0E6BA8",
      secondary: "#2E8B57",
      tertiary: "#D97706",
      error: "#B42318",
      background: mode === "dark" ? "#09131C" : "#F4F8FB",
      surface: mode === "dark" ? "#102131" : "#FFFFFF",
      surfaceVariant: mode === "dark" ? "#173043" : "#E7F0F7",
      outline: mode === "dark" ? "#5C7085" : "#8EA2B2",
      onPrimary: "#FFFFFF",
      onSecondary: "#FFFFFF",
      onBackground: mode === "dark" ? "#E8F0F7" : "#102131",
      onSurface: mode === "dark" ? "#E8F0F7" : "#102131",
      onSurfaceVariant: mode === "dark" ? "#B4C5D4" : "#355166",
    },
  };
}

export function buildNavigationTheme(mode, paperTheme) {
  const baseTheme =
    mode === "dark" ? NavigationDarkTheme : NavigationDefaultTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: paperTheme.colors.primary,
      background: paperTheme.colors.background,
      card: paperTheme.colors.surface,
      text: paperTheme.colors.onSurface,
      border: paperTheme.colors.outline,
      notification: paperTheme.colors.error,
    },
  };
}
