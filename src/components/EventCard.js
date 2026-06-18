import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";

import { formatDisplayDate, formatDisplayTime } from "../utils/dateUtils";
import { getEventState } from "../utils/eventUtils";

export function EventCard({ event, compact = false, onPress }) {
  const status = getEventState(event);

  const chipMode = {
    error: { backgroundColor: "#FEE4E2", textColor: "#912018" },
    warning: { backgroundColor: "#FFF3D6", textColor: "#8A4B00" },
    success: { backgroundColor: "#DDF7E4", textColor: "#14532D" },
    info: { backgroundColor: "#E7F0F7", textColor: "#174361" },
  }[status.tone];

  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text variant={compact ? "titleMedium" : "titleLarge"} style={styles.title}>
            {event.title}
          </Text>
          <Chip
            compact
            style={[styles.chip, { backgroundColor: chipMode.backgroundColor }]}
            textStyle={{ color: chipMode.textColor }}
          >
            {status.label}
          </Chip>
        </View>

        <Text style={styles.meta}>{formatDisplayDate(event.date)}</Text>
        <Text style={styles.meta}>{formatDisplayTime(event.startTime, event.endTime)}</Text>
        <Text style={styles.meta}>{event.location}</Text>
        <Text style={styles.meta}>{event.category}</Text>

        {!compact ? (
          <Text style={styles.description} numberOfLines={3}>
            {event.description}
          </Text>
        ) : null}

        <Button
          mode="contained-tonal"
          onPress={onPress}
          style={styles.button}
          accessibilityLabel={`Open details for ${event.title}`}
        >
          View details
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 16,
  },
  content: {
    gap: 6,
  },
  header: {
    gap: 10,
  },
  title: {
    fontWeight: "700",
  },
  chip: {
    alignSelf: "flex-start",
  },
  meta: {
    lineHeight: 20,
  },
  description: {
    lineHeight: 22,
    marginTop: 4,
  },
  button: {
    marginTop: 12,
    minHeight: 44,
  },
});
