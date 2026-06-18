import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export function StatusBanner({ tone = "info", message }) {
  const theme = useTheme();

  if (!message) {
    return null;
  }

  const toneMap = {
    info: {
      backgroundColor: theme.colors.surfaceVariant,
      color: theme.colors.onSurfaceVariant,
    },
    success: {
      backgroundColor: "#DDF7E4",
      color: "#14532D",
    },
    warning: {
      backgroundColor: "#FFF3D6",
      color: "#8A4B00",
    },
    error: {
      backgroundColor: "#FEE4E2",
      color: "#912018",
    },
  };

  const activeTone = toneMap[tone] ?? toneMap.info;

  return (
    <View style={[styles.banner, { backgroundColor: activeTone.backgroundColor }]}>
      <Text style={[styles.message, { color: activeTone.color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  message: {
    lineHeight: 20,
  },
});
