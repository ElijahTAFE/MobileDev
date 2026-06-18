import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export function EmptyState({ title, body, actionLabel, onActionPress }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
        },
      ]}
    >
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.body}>{body}</Text>
      {actionLabel ? (
        <Button mode="contained" onPress={onActionPress} style={styles.button}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
  },
  title: {
    marginBottom: 8,
  },
  body: {
    lineHeight: 20,
  },
  button: {
    marginTop: 16,
    alignSelf: "flex-start",
  },
});
