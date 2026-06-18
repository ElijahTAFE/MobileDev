import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

import { EmptyState } from "../components/EmptyState";
import { ScreenContainer } from "../components/ScreenContainer";
import { useEvents } from "../context/EventsContext";
import { useSettings } from "../context/SettingsContext";
import { formatDisplayDate, formatDisplayTime } from "../utils/dateUtils";
import { getEventState } from "../utils/eventUtils";

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text variant="labelLarge" style={styles.detailLabel}>
        {label}
      </Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export function EventDetailsScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const { scaleText } = useSettings();
  const { getEventById, hasRegistrationForEvent } = useEvents();

  const event = getEventById(route.params?.eventId);
  const isWide = width >= 900;

  if (!event) {
    return (
      <ScreenContainer scrollable>
        <EmptyState
          title="Event not found"
          body="This event could not be loaded. Go back to the events list and try again."
          actionLabel="Back to events"
          onActionPress={() => navigation.navigate("EventsList")}
        />
      </ScreenContainer>
    );
  }

  const status = getEventState(event);
  const alreadyRegistered = hasRegistrationForEvent(event.id);
  const registrationDisabled =
    alreadyRegistered || event.isCancelled || event.spotsRemaining <= 0;

  return (
    <ScreenContainer scrollable>
      <Card mode="contained" style={styles.heroCard}>
        <Card.Content style={styles.heroContent}>
          <Text variant="headlineSmall" style={{ fontSize: scaleText(28), fontWeight: "800" }}>
            {event.title}
          </Text>
          <Text style={{ fontSize: scaleText(15), color: theme.colors.onSurfaceVariant }}>
            {formatDisplayDate(event.date)} · {formatDisplayTime(event.startTime, event.endTime)}
          </Text>
          <Text style={{ fontSize: scaleText(15), color: theme.colors.onSurfaceVariant }}>
            {event.location}
          </Text>
          <Text
            style={{
              alignSelf: "flex-start",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor:
                status.tone === "error"
                  ? "#FEE4E2"
                  : status.tone === "warning"
                    ? "#FFF3D6"
                    : status.tone === "success"
                      ? "#DDF7E4"
                      : "#E7F0F7",
            }}
          >
            {status.label}
          </Text>
        </Card.Content>
      </Card>

      <View style={[styles.contentGrid, isWide && styles.contentGridWide]}>
        <Card mode="contained" style={styles.contentCard}>
          <Card.Content style={styles.contentSection}>
            <Text variant="titleLarge" style={{ fontSize: scaleText(22) }}>
              About this event
            </Text>
            <Text style={{ fontSize: scaleText(15), lineHeight: 24 }}>
              {event.description}
            </Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.contentCard}>
          <Card.Content style={styles.contentSection}>
            <Text variant="titleLarge" style={{ fontSize: scaleText(22) }}>
              Event details
            </Text>
            <DetailRow label="Category" value={event.category} />
            <DetailRow label="Capacity" value={`${event.capacity} places`} />
            <DetailRow label="Spots remaining" value={`${event.spotsRemaining}`} />
            <DetailRow label="App support" value="Works on phone and tablet" />

            {alreadyRegistered ? (
              <Text style={{ color: theme.colors.secondary, fontWeight: "700" }}>
                You have already registered for this event.
              </Text>
            ) : null}

            <Button
              mode="contained"
              onPress={() => navigation.navigate("Register", { eventId: event.id })}
              disabled={registrationDisabled}
              style={styles.registerButton}
            >
              {alreadyRegistered
                ? "Registered"
                : event.isCancelled
                  ? "Registration unavailable"
                  : event.spotsRemaining <= 0
                    ? "Event full"
                    : "Register now"}
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    marginBottom: 16,
  },
  heroContent: {
    gap: 10,
  },
  contentGrid: {
    gap: 16,
  },
  contentGridWide: {
    flexDirection: "row",
  },
  contentCard: {
    flex: 1,
  },
  contentSection: {
    gap: 14,
  },
  detailRow: {
    gap: 4,
  },
  detailLabel: {
    fontWeight: "700",
  },
  detailValue: {
    lineHeight: 22,
  },
  registerButton: {
    marginTop: 8,
    minHeight: 44,
  },
});
