import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  Card,
  SegmentedButtons,
  Switch,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

import { ScreenContainer } from "../components/ScreenContainer";
import { useSettings } from "../context/SettingsContext";
import { TEXT_SCALE_OPTIONS } from "../theme/theme";

export function SettingsScreen() {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const {
    settings,
    scaleText,
    setThemeMode,
    setTextScale,
    setSoundEnabled,
  } = useSettings();
  const isWide = width >= 900;
  const isCompact = width < 430;

  return (
    <ScreenContainer scrollable>
      <View style={[styles.grid, isWide && styles.gridWide]}>
        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.content}>
            <Text variant="headlineSmall" style={{ fontSize: scaleText(26), fontWeight: "800" }}>
              Settings
            </Text>
            <Text style={{ fontSize: scaleText(15), color: theme.colors.onSurfaceVariant }}>
              Change the app theme, text size, and sound setting. These settings save on
              this device.
            </Text>

            <Text variant="titleMedium" style={{ fontSize: scaleText(20) }}>
              Theme
            </Text>
            <SegmentedButtons
              value={settings.themeMode}
              onValueChange={setThemeMode}
              buttons={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
              ]}
            />

            <Text variant="titleMedium" style={{ fontSize: scaleText(20) }}>
              Text size
            </Text>
            <SegmentedButtons
              value={settings.textScale}
              onValueChange={setTextScale}
              buttons={TEXT_SCALE_OPTIONS.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
            />

            <TouchableRipple
              onPress={() => setSoundEnabled(!settings.soundEnabled)}
              borderless={false}
              style={styles.switchRow}
            >
              <View style={[styles.switchContent, isCompact && styles.switchContentCompact]}>
                <View style={styles.switchCopy}>
                  <Text variant="titleMedium" style={{ fontSize: scaleText(18) }}>
                    Sound cues
                  </Text>
                  <Text
                    style={{ fontSize: scaleText(14), color: theme.colors.onSurfaceVariant }}
                  >
                    Turn the sound message on or off for registration feedback.
                  </Text>
                </View>
                <View style={[styles.switchControlRow, isCompact && styles.switchControlRowCompact]}>
                  <Text style={{ fontSize: scaleText(14), fontWeight: "700" }}>
                    {settings.soundEnabled ? "On" : "Off"}
                  </Text>
                  <Switch
                    value={settings.soundEnabled}
                    onValueChange={setSoundEnabled}
                    accessibilityLabel="Toggle sound cues"
                    style={isCompact ? styles.switchCompact : null}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.content}>
            <Text variant="titleLarge" style={{ fontSize: scaleText(22) }}>
              Preview
            </Text>
            <Text style={{ fontSize: scaleText(18), fontWeight: "700" }}>
              Text preview
            </Text>
            <Text
              style={{ fontSize: scaleText(15), lineHeight: 24, color: theme.colors.onSurfaceVariant }}
            >
              This section shows how the current text size looks in the app.
            </Text>
            <View
              style={[
                styles.previewPanel,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Text style={{ fontSize: scaleText(16), fontWeight: "700" }}>
                Theme: {settings.themeMode}
              </Text>
              <Text style={{ fontSize: scaleText(14) }}>
                Text scale: {settings.textScale}
              </Text>
              <Text style={{ fontSize: scaleText(14) }}>
                Sound cues: {settings.soundEnabled ? "On" : "Off"}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: 16,
  },
  gridWide: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  card: {
    flex: 1,
  },
  content: {
    gap: 14,
  },
  switchRow: {
    borderRadius: 18,
  },
  switchContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    minHeight: 52,
    paddingVertical: 8,
  },
  switchContentCompact: {
    alignItems: "stretch",
    flexDirection: "column",
  },
  switchCopy: {
    flex: 1,
    gap: 4,
  },
  switchControlRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  switchControlRowCompact: {
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  switchCompact: {
    marginTop: 0,
  },
  previewPanel: {
    borderRadius: 18,
    gap: 8,
    padding: 16,
  },
});
