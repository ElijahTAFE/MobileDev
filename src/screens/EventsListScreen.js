import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Button,
  Card,
  Chip,
  Searchbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

import { EmptyState } from "../components/EmptyState";
import { EventCard } from "../components/EventCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { StatusBanner } from "../components/StatusBanner";
import { useEvents } from "../context/EventsContext";
import { useSettings } from "../context/SettingsContext";
import { toDateKey } from "../utils/dateUtils";
import { filterEvents, getAvailableCategories } from "../utils/eventUtils";

export function EventsListScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const { scaleText } = useSettings();
  const {
    events,
    isLoading,
    isRefreshing,
    warningMessage,
    refreshEvents,
  } = useEvents();

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (route.params?.datePreset === "today") {
      setDateFilter(toDateKey(new Date()));
    }
  }, [route.params?.datePreset]);

  function resetFilters() {
    setSearch("");
    setDateFilter("");
    setSelectedCategory("All");
  }

  const categories = getAvailableCategories(events);
  const filteredEvents = filterEvents(events, {
    search,
    date: dateFilter,
    category: selectedCategory,
  });
  const isWide = width >= 900;

  const header = (
    <View>
      <Card mode="contained" style={styles.filterCard}>
        <Card.Content style={styles.filterContent}>
          <Text variant="titleLarge" style={{ fontSize: scaleText(22) }}>
            Browse events
          </Text>
          <Text style={{ fontSize: scaleText(15), color: theme.colors.onSurfaceVariant }}>
            Search by name, filter by date, or choose a category.
          </Text>

          <StatusBanner
            tone="info"
            message="Guest browsing is available here. You do not need to log in to view events."
          />

          <Button mode="contained" onPress={() => navigation.navigate("CreateEvent")}>
            Create event
          </Button>

          <Searchbar
            placeholder="Search by title, location, or category"
            value={search}
            onChangeText={setSearch}
            style={styles.searchbar}
            inputStyle={{ minHeight: 44 }}
          />

          <TextInput
            mode="outlined"
            label="Filter by date (YYYY-MM-DD)"
            value={dateFilter}
            onChangeText={setDateFilter}
            right={
              dateFilter ? <TextInput.Icon icon="close" onPress={() => setDateFilter("")} /> : null
            }
          />

          <View style={styles.categoryWrap}>
            {categories.map((category) => (
              <Chip
                key={category}
                selected={category === selectedCategory}
                onPress={() => setSelectedCategory(category)}
                style={styles.categoryChip}
              >
                {category}
              </Chip>
            ))}
          </View>

          <View style={styles.filterActions}>
            <Button mode="outlined" onPress={resetFilters}>
              Clear filters
            </Button>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              {filteredEvents.length} matching event{filteredEvents.length === 1 ? "" : "s"}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <StatusBanner tone="warning" message={warningMessage} />
    </View>
  );

  return (
    <ScreenContainer style={styles.container}>
      <FlatList
        key={isWide ? "wide" : "compact"}
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={isWide ? 2 : 1}
        columnWrapperStyle={isWide ? styles.columnWrapper : undefined}
        ListHeaderComponent={header}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              title="No events match those filters"
              body="Try clearing the filters or picking a different date."
              actionLabel="Reset filters"
              onActionPress={resetFilters}
            />
          ) : null
        }
        renderItem={({ item }) => (
          <View style={isWide ? styles.wideCardWrapper : styles.cardWrapper}>
            <EventCard
              event={item}
              onPress={() => navigation.navigate("EventDetails", { eventId: item.id })}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshEvents} />
        }
        ListFooterComponent={
          isLoading ? (
            <Card mode="contained">
              <Card.Content>
                <Text>Loading events...</Text>
              </Card.Content>
            </Card>
          ) : null
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingBottom: 120,
  },
  filterCard: {
    marginBottom: 16,
  },
  filterContent: {
    gap: 12,
  },
  searchbar: {
    minHeight: 48,
  },
  categoryWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryChip: {
    minHeight: 40,
  },
  filterActions: {
    alignItems: "flex-start",
    gap: 12,
  },
  columnWrapper: {
    gap: 16,
  },
  cardWrapper: {
    width: "100%",
  },
  wideCardWrapper: {
    flex: 1,
  },
});
