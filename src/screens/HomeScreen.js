import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

import { EventCard } from "../components/EventCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { StatusBanner } from "../components/StatusBanner";
import { APP_NAME, APP_TAGLINE } from "../config/appConfig";
import { useEvents } from "../context/EventsContext";
import { useSettings } from "../context/SettingsContext";
import { getTodaysEvents } from "../utils/eventUtils";

export function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const { scaleText } = useSettings();
  const { events, isLoading, warningMessage, dataSource, endpointMessage, remoteSavedCount } =
    useEvents();
  const todaysEvents = getTodaysEvents(events);
  const featuredEvents = todaysEvents.length ? todaysEvents : events;
  const isWide = width >= 900;
  const showingToday = todaysEvents.length > 0;
  const savedFromEndpoint = dataSource === "remote" ? remoteSavedCount : 0;
  const panelLabelStyle = {
    fontSize: scaleText(14),
    color: theme.colors.onSurfaceVariant,
  };
  const panelValueStyle = {
    fontSize: scaleText(20),
    color: theme.colors.onSurface,
  };

  function openFeaturedEvents() {
    navigation.navigate(
      "EventsTab",
      showingToday
        ? {
            screen: "EventsList",
            params: { datePreset: "today" },
          }
        : { screen: "EventsList" },
    );
  }

  return (
    <ScreenContainer scrollable>
      <Card mode="contained" style={styles.heroCard}>
        <Card.Content style={[styles.heroContent, isWide && styles.heroWide]}>
          <View style={styles.heroCopy}>
            <Text
              variant="headlineMedium"
              style={[styles.title, { fontSize: scaleText(28), color: theme.colors.onSurface }]}
            >
              {APP_NAME}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { fontSize: scaleText(16), color: theme.colors.onSurfaceVariant },
              ]}
            >
              {APP_TAGLINE}
            </Text>
            <Text
              style={[
                styles.body,
                { fontSize: scaleText(15), color: theme.colors.onSurfaceVariant },
              ]}
            >
              Check local events, open the details page, and register in a few taps.
            </Text>
            <View style={styles.heroActions}>
              <Button mode="contained" onPress={openFeaturedEvents} style={styles.primaryAction}>
                {showingToday ? "See today's events" : "See all events"}
              </Button>
              <Button
                mode="outlined"
                onPress={() =>
                  navigation.navigate("EventsTab", {
                    screen: "CreateEvent",
                  })
                }
              >
                Create event
              </Button>
              <Button
                mode="outlined"
                onPress={() =>
                  navigation.navigate("EventsTab", {
                    screen: "Account",
                  })
                }
              >
                Sign in or sign up
              </Button>
            </View>
          </View>

          <View
            style={[
              styles.metricPanel,
              {
                backgroundColor: theme.colors.surfaceVariant,
                borderColor: theme.colors.outline,
              },
            ]}
          >
            <Text
              style={[
                styles.metricLabel,
                panelLabelStyle,
              ]}
            >
              Endpoint
            </Text>
            <Text
              style={[
                styles.metricValue,
                panelValueStyle,
              ]}
            >
              {endpointMessage}
            </Text>
            <Text
              style={[
                styles.metricLabel,
                panelLabelStyle,
              ]}
            >
              Saved to array
            </Text>
            <Text
              style={[
                styles.metricValue,
                panelValueStyle,
              ]}
            >
              {savedFromEndpoint}
            </Text>
            <Text
              style={[
                styles.metricLabel,
                panelLabelStyle,
              ]}
            >
              {showingToday ? "Today" : "Events"}
            </Text>
            <Text
              style={[
                styles.metricValue,
                panelValueStyle,
              ]}
            >
              {showingToday ? todaysEvents.length : events.length}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <StatusBanner tone="warning" message={warningMessage} />

      <View style={styles.sectionHeader}>
        <Text variant="titleLarge" style={{ fontSize: scaleText(22) }}>
          {showingToday ? "Today at a glance" : "Upcoming events"}
        </Text>
        <Text style={{ fontSize: scaleText(15), color: theme.colors.onSurfaceVariant }}>
          {showingToday
            ? "These are the events happening today."
            : "These are the events currently loaded into the app."}
        </Text>
      </View>

      {isLoading ? (
        <Card mode="contained">
          <Card.Content>
            <Text style={{ fontSize: scaleText(15) }}>Loading events...</Text>
          </Card.Content>
        </Card>
      ) : null}

      <View style={[styles.cardsGrid, isWide && styles.cardsGridWide]}>
        {featuredEvents.slice(0, 4).map((event) => (
          <View key={event.id} style={[styles.cardColumn, isWide && styles.cardColumnWide]}>
            <EventCard
              event={event}
              compact={!isWide}
              onPress={() =>
                navigation.navigate("EventsTab", {
                  screen: "EventDetails",
                  params: { eventId: event.id },
                })
              }
            />
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    marginBottom: 16,
  },
  heroContent: {
    gap: 20,
  },
  heroWide: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroCopy: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontWeight: "800",
  },
  subtitle: {
    fontWeight: "700",
  },
  body: {
    lineHeight: 22,
    marginTop: 4,
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  },
  primaryAction: {
    minHeight: 44,
  },
  metricPanel: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    minWidth: 220,
    gap: 8,
  },
  metricLabel: {
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: "700",
  },
  metricValue: {
    fontWeight: "800",
    marginBottom: 4,
  },
  sectionHeader: {
    gap: 4,
    marginBottom: 12,
  },
  cardsGrid: {
    gap: 8,
  },
  cardsGridWide: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  cardColumn: {
    width: "100%",
  },
  cardColumnWide: {
    width: "48%",
  },
});
