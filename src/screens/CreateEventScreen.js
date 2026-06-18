import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";

import { ScreenContainer } from "../components/ScreenContainer";
import { StatusBanner } from "../components/StatusBanner";
import { useEvents } from "../context/EventsContext";
import { useSettings } from "../context/SettingsContext";
import { addDays, toDateKey } from "../utils/dateUtils";

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime());
}

function isValidTime(value) {
  return /^\d{2}:\d{2}$/.test(value);
}

export function CreateEventScreen({ navigation }) {
  const theme = useTheme();
  const { scaleText } = useSettings();
  const { createEvent } = useEvents();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(toDateKey(addDays(new Date(), 1)));
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Community");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("20");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!title.trim()) {
      setMessageTone("error");
      setMessage("Please enter an event title.");
      return;
    }

    if (!isValidDate(date.trim())) {
      setMessageTone("error");
      setMessage("Please enter a valid date in YYYY-MM-DD format.");
      return;
    }

    if (!isValidTime(startTime.trim()) || !isValidTime(endTime.trim())) {
      setMessageTone("error");
      setMessage("Please enter start and end times in HH:MM format.");
      return;
    }

    if (!location.trim()) {
      setMessageTone("error");
      setMessage("Please enter a location.");
      return;
    }

    const parsedCapacity = Number(capacity);
    if (!Number.isInteger(parsedCapacity) || parsedCapacity <= 0) {
      setMessageTone("error");
      setMessage("Please enter a whole number for capacity.");
      return;
    }

    setIsSubmitting(true);
    const result = await createEvent({
      title,
      date,
      startTime,
      endTime,
      location,
      category,
      description,
      capacity: parsedCapacity,
    });
    setIsSubmitting(false);
    setMessageTone(result.ok ? "success" : "error");
    setMessage(result.message);

    if (result.ok) {
      navigation.replace("EventDetails", { eventId: result.eventId });
    }
  }

  return (
    <ScreenContainer scrollable>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.content}>
            <Text variant="headlineSmall" style={{ fontSize: scaleText(26), fontWeight: "800" }}>
              Create event
            </Text>
            <Text style={{ fontSize: scaleText(15), color: theme.colors.onSurfaceVariant }}>
              Fill in the form below to add a new event. The event will be added to
              the local array and appear in the events list.
            </Text>

            <StatusBanner tone={messageTone} message={message} />

            <TextInput
              mode="outlined"
              label="Event title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              mode="outlined"
              label="Date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
            />

            <View style={styles.row}>
              <TextInput
                mode="outlined"
                label="Start time"
                value={startTime}
                onChangeText={setStartTime}
                style={styles.rowInput}
              />
              <TextInput
                mode="outlined"
                label="End time"
                value={endTime}
                onChangeText={setEndTime}
                style={styles.rowInput}
              />
            </View>

            <TextInput
              mode="outlined"
              label="Location"
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              mode="outlined"
              label="Category"
              value={category}
              onChangeText={setCategory}
            />
            <TextInput
              mode="outlined"
              label="Capacity"
              value={capacity}
              onChangeText={setCapacity}
              keyboardType="number-pad"
            />
            <TextInput
              mode="outlined"
              label="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <View style={styles.actions}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
                style={styles.submitButton}
              >
                Save event
              </Button>
              <Button mode="outlined" onPress={() => navigation.goBack()}>
                Cancel
              </Button>
            </View>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  content: {
    gap: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowInput: {
    flex: 1,
  },
  actions: {
    gap: 12,
  },
  submitButton: {
    minHeight: 44,
  },
});
